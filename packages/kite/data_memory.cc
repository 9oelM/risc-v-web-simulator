#include <cstring>
#include <fstream>
#include <iostream>
#include <sstream>
#include "defs.h"
#include "data_cache.h"
#include "data_memory.h"

using namespace std;

data_memory_t::data_memory_t(const char* memory_state, uint64_t *m_ticks, uint64_t m_memory_size, uint64_t m_latency) :
    cache(0),
    ticks(m_ticks),
    memory(0),
    accessed(0),
    memory_size(m_memory_size),
    num_dwords(m_memory_size>>3),
    latency(m_latency),
    resp_ticks(0),
    req_block(0) {
    // Check if the memory size is a multiple of doubleword.
    if(memory_size & 0b111) {
        throw std::logic_error("Memory Error: memory size must be a multiple of doubleword");
    }
    if(memory_size < min_memory_size) {
        throw std::logic_error("Memory Error: memory size has to be at least 2KB");
    }

    // Allocate a memory space in unit of doublewords.
    memory = new int64_t[num_dwords];
    accessed = new bool[num_dwords];

    // Zero the memory space.
    memset(memory,   0, num_dwords * sizeof(int64_t));
    memset(accessed, 0, num_dwords * sizeof(bool));

    // Load initial memory state.
    load_memory_state(memory_state);
}

data_memory_t::~data_memory_t() {
    // Deallocate the memory space.
    delete [] memory;
    delete [] accessed;
}

// Connect to the upper-level cache.
void data_memory_t::connect(data_cache_t *m_cache) { cache = m_cache; }

// Run the data memory.
void data_memory_t::run() {
    if(req_block && (*ticks >= resp_ticks)) {
        // Invoke the upper-level cache to handle a returned response.
        cache->handle_response(req_block);
        // Clear the requested block.
        req_block = 0;
    }
}

// Load a memory block.
void data_memory_t::load_block(uint64_t m_addr, uint64_t m_block_size) {
    // Check the doubleword alignment of memory address.
    if(m_addr & 0b111) {
        throw std::logic_error("Memory Error: invalid alignment of memory address " + std::to_string(m_addr));
    }
    // Check if the requested block size is within memory space.
    if((m_addr+m_block_size) > memory_size) {
        throw std::logic_error("Memory Error: memory address " + std::to_string(m_addr) + " is out of bounds");
    }
    else if(m_addr < code_segment_size) {
        throw std::logic_error("Memory Error: memory address " + std::to_string(m_addr) + " is in the code segment");
    }

    // Mark all doublewords in the requested block are accessed.
    for(uint64_t i = 0; i < m_block_size>>3; i++) { accessed[(m_addr>>3)+i] = true; }
    // Set pointer to a requested block.
    req_block = &memory[m_addr>>3];
    // Set time ticks to respond to the cache later.
    resp_ticks = *ticks + latency;
}

// Load initial memory state.
void data_memory_t::load_memory_state(const char* m_memory_state) {
    istringstream memory_state_stream(m_memory_state);

    string line;
    size_t line_num = 0;
    while(getline(memory_state_stream, line)) {
        line_num++;
        // Crop everything after a comment symbol.
        if(line.find_first_of("#") != string::npos) { line.erase(line.find_first_of("#")); }
        // Erase all spaces.
        line.erase(remove(line.begin(), line.end(), ' '), line.end());
        // Skip blank lines.
        if(!line.size()) { continue; }
        // Store memory state.
        size_t l = line.find_first_of("=");
        string addr_str = line.substr(0, l);
        // Trim the line.
        line.erase(0, l+1);
        string data_str = line;

        // Check if the memory address and data are valid.
        if(!is_num_str(addr_str) || !is_num_str(data_str) ||
           !addr_str.length()    || !data_str.length()) {
            throw std::logic_error("Memory Error: invalid memory address and/or data " + addr_str
                 + " = " + data_str + " at line #" + std::to_string(line_num)
                 + " of memory_state");
        }

        // Convert the memory address and data string to numbers.
        uint64_t memory_addr = get_imm(addr_str); 
        int64_t memory_data = get_imm(data_str);
        // Check the alignment of memory address.
        if(memory_addr & 0b111) {
            throw std::logic_error("Memory Error: invalid alignment of memory address " + std::to_string(memory_addr)
                 + " at line #" + std::to_string(line_num) + " of memory_state");
        }
        // The memory address goes out of bounds.
        if((memory_addr+8) > memory_size) {
            throw std::logic_error("Memory Error: memory address " + std::to_string(memory_addr) + " is out of bounds"
                 + " at line #" + std::to_string(line_num) + " of memory_state");
        }
        else if(memory_addr < code_segment_size) {
            throw std::logic_error("Memory Error: memory address below " + std::to_string(code_segment_size)
                 + " is reserved for the code segment");
        }
        // Check if multiple different values are defined at the same memory address.
        int64_t &dword = memory[memory_addr>>3];
        if(dword && (dword != memory_data)) {
            throw std::logic_error("Memory Error: memory address " + std::to_string(memory_addr)
                 + " has multiple values defined at line # " + std::to_string(line_num)
                 + " of memory_state");
        }
        // Store the memory data.
        dword = memory_data;
    }

    memory_state_stream.clear();
}

// Print memory state.
void data_memory_t::print_state(std::ostringstream& program_log) const {
    program_log << endl << "Memory state (only accessed addresses):" << endl;
    for(uint64_t i = 0; i < num_dwords; i++) {
        if(accessed[i]) { program_log << "(" << (i<<3) << ") = " << memory[i] << endl; }
    }
}


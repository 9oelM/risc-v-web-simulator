#include <cstdlib>
#include <iostream>
#include "data_cache.h"

using namespace std;

data_cache_t::data_cache_t(
    uint64_t *m_ticks, uint64_t m_cache_size,
    int8_t *is_debug_on, int8_t *is_data_fwd_on,
    uint64_t m_block_size, uint64_t m_ways
) :
    memory(0),
    ticks(m_ticks),
    blocks(0),
    cache_size(m_cache_size),
    block_size(m_block_size),
    is_debug_on(is_debug_on),
    is_data_fwd_on(is_data_fwd_on),
    num_sets(0),
    num_ways(m_ways),
    block_offset(0),
    set_offset(0),
    block_mask(0),
    set_mask(0),
    num_accesses(0),
    num_misses(0),
    num_loads(0),
    num_stores(0),
    num_writebacks(0),
    missed_inst(0) {
    // Calculate the block offset.
    uint64_t val = block_size;
    while(!(val & 0b1)) {
        val = val >> 1; block_offset++;
        block_mask = (block_mask << 1) | 0b1;
    }
    // Check if the block size is a multiple of doubleword.
    if((block_size & 0b111) || (val != 1)) {
        throw std::logic_error("Cache Error: cache block size must be a multiple of doubleword");
    }

    // Check if the number of ways is a power of two.
    val = num_ways;
    while(!(val & 0b1)) { val = val >> 1; }
    if(val != 1) {
        throw std::logic_error("Cache Error: number of ways must be a power of two");
    }

    // Calculate the number of sets.
    num_sets = cache_size / block_size / num_ways;
    // Calculate the set offset and mask.
    val = num_sets;
    while(!(val & 0b1)) {
        val = val >> 1; set_offset++;
        set_mask = (set_mask << 1) | 0b1;
    }
    set_offset += block_offset;
    set_mask = set_mask << block_offset;
    // Check if the number of sets is a power of two.
    if(val != 1) {
        throw std::logic_error("Cache Error: number of sets must be a power of two");
    }
    
    // Allocate cache blocks.
    blocks = new block_t*[num_sets]();
    for(uint64_t i = 0; i < num_sets; i++) { blocks[i] = new block_t[num_ways](); }
}

data_cache_t::~data_cache_t() {
    // Deallocate the cache blocks.
    for(uint64_t i = 0; i < num_sets; i++) { delete [] blocks[i]; }
    delete [] blocks;
}

// Connect to the lower-level memory.
void data_cache_t::connect(data_memory_t *m_memory) { memory = m_memory; }

// Is cache free?
bool data_cache_t::is_free() const { return !missed_inst; }

// Read data from cache.
void data_cache_t::read(inst_t *m_inst, std::ostringstream& program_log) {
    // Check the memory address alignment.
    uint64_t addr = m_inst->memory_addr;
    if(addr & 0b111) {
        throw std::logic_error("Cache Error: invalid alignment of memory address " + std::to_string(addr));
    }

    // Calculate the set index and tag.
    uint64_t set_index = (addr & set_mask) >> block_offset;
    uint64_t tag = addr >> set_offset;

    // Check direct-mapped cache entry.
    block_t *block = &blocks[set_index][0];
    if(!block->valid || (block->tag != tag)) { block = 0; }
    
    if(block) { // Cache hit
        // Update the last access time.
        block->last_access = *ticks;
        // Read a doubleword in the block.
        m_inst->rd_val = *(block->data + ((addr & block_mask) >> 3));
        if (*is_data_fwd_on) {
            m_inst->rd_ready = true;
        }
        num_accesses++;
        num_loads++;
    }
    else { // Cache miss
        missed_inst = m_inst;
        memory->load_block(addr & ~block_mask, block_size);
        num_misses++;
        if (*is_debug_on) {
            program_log << *ticks << " : cache miss : addr = " << addr
             << " (tag = " << tag << ", set = " << set_index << ")" << endl;
        }
    }
}

// Write data in memory.
void data_cache_t::write(inst_t *m_inst, std::ostringstream& program_log) {
    // Check the memory address alignment.
    uint64_t addr = m_inst->memory_addr;
    if(addr & 0b111) {
        throw std::logic_error("Cache Error: invalid alignment of memory address " + std::to_string(addr));
    }

    // Calculate the set index and tag.
    uint64_t set_index = (addr & set_mask) >> block_offset;
    uint64_t tag = addr >> set_offset;

    // Check the direct-mapped cache entry.
    block_t *block = &blocks[set_index][0];
    if(!block->valid || (block->tag != tag)) { block = 0; }

    if(block) { // Cache hit
        // Update the last access time and dirty flag.
        block->last_access = *ticks;
        block->dirty = true;
        // Write a doubleword in the block.
        *(block->data + ((addr & block_mask) >> 3)) = m_inst->rs2_val;
        num_accesses++;
        num_stores++;
    }
    else { // Cache miss
        missed_inst = m_inst;
        memory->load_block(addr & ~block_mask, block_size);
        num_misses++;
        if (*is_debug_on) {
            program_log << *ticks << " : cache miss : addr = " << addr
             << " (tag = " << tag << ", set = " << set_index << ")" << endl;
        }
    }
}

// Handle a memory response.
void data_cache_t::handle_response(int64_t *m_data, std::ostringstream& program_log) {
    // Calculate the set index and tag.
    uint64_t addr = missed_inst->memory_addr;
    uint64_t set_index = (addr & set_mask) >> block_offset;
    uint64_t tag = addr >> set_offset;

    // Block replacement
    block_t *allocator = &blocks[set_index][0];
    if(allocator->dirty) { num_writebacks++; }
    if (*is_debug_on) {
        if(allocator->valid) {
            program_log << *ticks << " : cache block eviction : addr = " << addr
                << " (tag = " << tag << ", set = " << set_index << ")" << endl;
        }
    }
    // Place the missed block.
    *allocator = block_t(tag, m_data, /* valid */ true);

    // Replay the cache access.
    if(missed_inst->op == op_ld) { read(missed_inst, program_log); }
    else { write(missed_inst, program_log); }
    // Clear the missed instruction so that the cache becomes free.
    missed_inst = 0;
}

// Run data cache.
bool data_cache_t::run(std::ostringstream& program_log) {
    memory->run(program_log);          // Run the data memory.
    return missed_inst;     // Return true if the cache is busy.
}

// Print cache stats.
void data_cache_t::print_stats(std::ostringstream& program_log) {
    program_log << endl << "Data cache stats:" << endl;
    program_log.precision(3);
    program_log << "    Number of loads = " << num_loads << endl;
    program_log << "    Number of stores = " << num_stores << endl;
    program_log << "    Number of writebacks = " << num_writebacks << endl;
    program_log << "    Miss rate = " << fixed
         << (num_accesses ? double(num_misses) / double(num_accesses) : 0)
         << " (" << num_misses << "/" << num_accesses << ")" << endl;
    program_log.precision(-1);
}


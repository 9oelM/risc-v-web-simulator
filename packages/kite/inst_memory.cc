#include <cstdlib>
#include <fstream>
#include <sstream>
#include <iostream>
#include "inst_memory.h"

using namespace std;

inst_memory_t::inst_memory_t(const char *m_program_code) {
    memory.reserve(100);                // Reserve space for instructions.
    load_program_code(m_program_code);  // Load a program code.
}

inst_memory_t::~inst_memory_t() {
}

// Read an instruction from memory.
inst_t* inst_memory_t::read(uint64_t m_pc) {
    inst_t *inst = 0;
    // PC should be in units of 4 bytes.
    m_pc = m_pc >> 2;
    // PC = 0 is reserved as invalid.
    if(m_pc && (m_pc < memory.size())) { inst = new inst_t(memory[m_pc]); }
    return inst;
}

// Get the total number of instructions in memory.
size_t inst_memory_t::num_insts() const{
    return memory.size();
}

// Load a program code.
void inst_memory_t::load_program_code(const char *m_program_code) {
    istringstream program_code_stream(m_program_code);

    // Insert a nop instruction at PC = 0 to make it as invalid.
    memory.insert(memory.begin(), inst_t());

    // Read and parse a program code.
    string line;
    size_t line_num = 0;
    while(getline(program_code_stream, line)) {
        line_num++;
        // Erase leading spaces.
        line.erase(0, line.find_first_not_of(" \t"));
        // Crop everything after a comment symbol.
        if(line.find_first_of("#") != string::npos) { line.erase(line.find_first_of("#")); }
        // Skip blank lines.
        if(!line.size()) { continue; }

        // Parse an instruction string.
        transform(line.begin(), line.end(), line.begin(), ::tolower);
        parse_inst_str(line, line_num);
    }

    // Clear stringstream memory
    program_code_stream.clear();

    // Revisit instructions, and replace labels with immediate values.
    for(size_t i = 0; i < memory.size(); i++) {
        inst_t &inst = memory[i];
        if((get_op_type(inst.op) == op_sb_type) || (get_op_type(inst.op) == op_uj_type)) {
            map<string, int64_t>::iterator it = labels.find(inst.label);
            if(it == labels.end()) {
                throw std::logic_error("Instruction Error: unknown label : " + get_inst_str(&inst));
            }
            // PC-relative distance
            inst.imm = ((it->second) - int64_t(inst.pc)) >> 1;
            // Check if the PC-relative distance fits into the immediate field of instruction.
            unsigned imm_width = (get_op_type(inst.op) == op_sb_type ? 12 : 20) - 1;
            if(inst.imm >= 0 ? inst.imm >> imm_width : (inst.imm >> imm_width) != -1) {
                throw std::logic_error("Instruction Error: branch target is too far away for " + get_inst_str(&inst));
            }
        }
    }

    // Labels are no longer needed.
    labels.clear();
}

// Parse an instruction string, and convert it to a Kite instruction.
void inst_memory_t::parse_inst_str(std::string m_inst_str, size_t m_line_num) {
    string inst_str = m_inst_str;

    // Parse an instruction string.
    vector<string> args;
    while(inst_str.size()) {
        // Get the next argument in the instruction string.
        size_t l = inst_str.find_first_of(" \t,():");
        // Append a colon symbol to the label.
        l += (inst_str[l] == ':' ? 1 : 0);
        args.push_back(inst_str.substr(0, l));
        // Trim the string.
        inst_str.erase(0, l);
        inst_str.erase(0, inst_str.find_first_not_of(" \t,()"));
    }

    // Check if args have a label.
    string lbl = args[0];
    if(lbl[lbl.size()-1] == ':') {
        // Remove the label from args.
        args.erase(args.begin());
        // Record a pair of label and PC in the map.
        labels.insert(pair<string, int64_t>(lbl.substr(0, lbl.size()-1), memory.size()<<2));
    }
    // Line has no instruction but only a label.
    if(!args.size()) { return; }

    inst_t inst;
    // Set the PC of instruction.
    inst.pc = memory.size() << 2;
    if(inst.pc >= code_segment_size) {
        throw std::logic_error("Instruction Error: program size goes out of the code segment.");
    }

    // Get the opcode of instruction.
    inst.op = get_opcode(args[0]);
    if(inst.op >= num_kite_opcodes) {
        throw std::logic_error("Instruction Error: unknown opcode " + args[0]
             + " at line #" + std::to_string(m_line_num));
    }

    // Set an ALU execution latency.
    inst.alu_latency = get_op_latency(inst.op);

    // Decode the instruction based on its type.
    switch(get_op_type(inst.op)) {
        case op_r_type: {
            // R-type format: op rd, rs1, rs2
            if(args.size() != 4) {
                throw std::logic_error("Instruction Error: incomplete instruction: " + m_inst_str
                     + " at line #" + std::to_string(m_line_num));
            }
            if(!is_reg_str(args[1]) || !is_reg_str(args[2]) || !is_reg_str(args[3])) {
                throw std::logic_error("Instruction Error: invalid instruction format: " + m_inst_str
                     + " at line #" + std::to_string(m_line_num));
            }
            inst.rd_num  = get_regnum(args[1]);
            inst.rs1_num = get_regnum(args[2]);
            inst.rs2_num = get_regnum(args[3]);
            break;
        }
        case op_i_type: {
            if(args.size() != 4) {
                throw std::logic_error("Instruction Error: incomplete instruction: " + m_inst_str
                     + " at line #" + std::to_string(m_line_num));
            }
            if((inst.op == op_jalr) || (inst.op == op_ld)) {
                // jalr and ld format: op rd, imm(rs1)
                if(!is_reg_str(args[1]) || !is_num_str(args[2]) || !is_reg_str(args[3])) {
                    throw std::logic_error("Instruction Error: invalid instruction format: " + m_inst_str
                         + " at line #" + std::to_string(m_line_num));
                }
                inst.rd_num  = get_regnum(args[1]);
                inst.imm     = get_imm(args[2]);
                inst.rs1_num = get_regnum(args[3]);
            }
            else {
                // I-type format: op rd, rs1, imm
                if(!is_reg_str(args[1]) || !is_reg_str(args[2]) || !is_num_str(args[3])) {
                    throw std::logic_error("Instruction Error: invalid instruction format: " + m_inst_str
                         + " at line #" + std::to_string(m_line_num));
                }
                inst.rd_num  = get_regnum(args[1]);
                inst.rs1_num = get_regnum(args[2]);
                inst.imm = get_imm(args[3]);
            }
            // Check if the immediate value fits into 12 bits.
            if(inst.imm >= 0 ? inst.imm >> 11 : (inst.imm >> 11) != -1) {
                throw std::logic_error("Instruction Error: invalid immediate value: " + m_inst_str
                     + " at line #" + std::to_string(m_line_num));
            }
            break;
        }
        case op_s_type: {
            // S-type format: op rs2, imm(rs1)
            if(args.size() != 4) {
                throw std::logic_error("Instruction Error: incomplete instruction: " + m_inst_str
                     + " at line #" + std::to_string(m_line_num));
            }
            if(!is_reg_str(args[1]) || !is_num_str(args[2]) || !is_reg_str(args[3])) {
                throw std::logic_error("Instruction Error: invalid instruction format: " + m_inst_str
                     + " at line #" + std::to_string(m_line_num));
            }
            inst.rs2_num = get_regnum(args[1]);
            inst.imm     = get_imm(args[2]);
            // Check if the immediate value fits into 12 bits.
            if(inst.imm >= 0 ? inst.imm >> 11 : (inst.imm >> 11) != -1) {
                throw std::logic_error("Instruction Error: invalid immediate value: " + m_inst_str
                     + " at line #" + std::to_string(m_line_num));
            }
            inst.rs1_num = get_regnum(args[3]);
            break;
        }
        case op_sb_type: {
            // SB-type format: op rs1, rs2, label
            if(args.size() != 4) {
                throw std::logic_error("Instruction Error: incomplete instruction: " + m_inst_str
                     + " at line #" + std::to_string(m_line_num));
            }
            if(!is_reg_str(args[1]) || !is_reg_str(args[2])) {
                throw std::logic_error("Instruction Error: invalid instruction format: " + m_inst_str
                         + " at line #" + std::to_string(m_line_num));
            }
            inst.rs1_num = get_regnum(args[1]);
            inst.rs2_num = get_regnum(args[2]);
            inst.label   = args[3];
            break;
        }
        case op_u_type: {
            // U-type format: op rd, imm
            if(args.size() != 3) {
                throw std::logic_error("Instruction Error: incomplete instruction: " + m_inst_str
                     + " at line #" + std::to_string(m_line_num));
            }
            if(!is_reg_str(args[1]) || !is_num_str(args[2])) {
                throw std::logic_error("Instruction Error: invalid instruction format: " + m_inst_str
                         + " at line #" + std::to_string(m_line_num));
            }
            inst.rd_num = get_regnum(args[1]);
            inst.imm    = get_imm(args[2]);
            // Check if the immediate value fits into 20 bits.
            if(inst.imm >= 0 ? inst.imm >> 19 : (inst.imm >> 19) != -1) {
                throw std::logic_error("Instruction Error: invalid immediate value: " + m_inst_str
                     + " at line #" + std::to_string(m_line_num));
            }
            break;
        }
        case op_uj_type: {
            // UL-type format: op rd, label
            if(args.size() != 3) {
                throw std::logic_error("Instruction Error: incomplete instruction: " + m_inst_str
                     + " at line #" + std::to_string(m_line_num));
            }
            if(!is_reg_str(args[1])) {
                throw std::logic_error("Instruction Error: invalid instruction format: " + m_inst_str
                         + " at line #" + std::to_string(m_line_num));
            }
            inst.rd_num  = get_regnum(args[1]);
            inst.label   = args[2];
            break;
        }
        default: { break; } // Nothing to do
    }

    // Store instruction in memory.
    memory.push_back(inst);
}


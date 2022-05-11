#include <iostream>
#include <map>
#include <sstream>
#include <vector>
#include "inst.h"

using namespace std;

inst_t::inst_t() :
    pc(0),
    op(op_nop),
    rd_num(-1),
    rs1_num(-1),
    rs2_num(-1),
    rd_val(0),
    rs1_val(0),
    rs2_val(0),
    imm(0),
    memory_addr(0),
    alu_latency(1),
    rd_ready(false),
    branch_target(0),
    pred_target(0),
    pred_taken(false) {
}

inst_t::inst_t(const inst_t &m_inst) :
    pc(m_inst.pc),
    op(m_inst.op),
    rd_num (m_inst.rd_num),
    rs1_num(m_inst.rs1_num),
    rs2_num(m_inst.rs2_num),
    rd_val(m_inst.rd_val),
    rs1_val(m_inst.rs1_val),
    rs2_val(m_inst.rs2_val),
    imm(m_inst.imm),
    label(m_inst.label),
    memory_addr(m_inst.memory_addr),
    alu_latency(m_inst.alu_latency),
    rd_ready(m_inst.rd_ready),
    branch_target(m_inst.branch_target),
    pred_target(m_inst.pred_target),
    pred_taken(m_inst.pred_taken) {
}

inst_t::~inst_t() {
}

// Convert a Kite instruction to string format.
string get_inst_str(inst_t *inst, bool details) {
    stringstream ss;
   
    // PC of instruction.
    if(details) { ss << "[pc=" << inst->pc << "] "; }

    // Compose an appropriate instruction format.
    switch(get_op_type(inst->op)) {
        case op_r_type: {
            // R-type format: op rd, rs1, rs2
            ss << kite_opcode_str[inst->op]     << " "
               << kite_reg_str[inst->rd_num]    << ", "
               << kite_reg_str[inst->rs1_num]   << ", "
               << kite_reg_str[inst->rs2_num];
            // Show register values.
            if(details) {
                ss << " ["
                   << kite_opcode_str[inst->op]     << " "
                   << inst->rd_val                  << ", "
                   << inst->rs1_val                 << ", "
                   << inst->rs2_val
                   << "]";
            }
            break;
        }
        case op_i_type: {
            if((inst->op == op_jalr) || (inst->op == op_ld)) {
                // jalr or ld format: op rd, imm(rs1)
                ss << kite_opcode_str[inst->op]     << " "
                   << kite_reg_str[inst->rd_num]    << ", " 
                   << inst->imm                     << "("
                   << kite_reg_str[inst->rs1_num]   << ")";
                // Show register values.
                if(details) {
                    ss << " ["
                       << kite_opcode_str[inst->op] << " "
                       << inst->rd_val              << ", "
                       << inst->imm                 << "("
                       << inst->rs1_val             << ")"
                       << "]";
                }
            }
            else {
                // I-type format: op rd, rs1, imm
                ss << kite_opcode_str[inst->op]     << " "
                   << kite_reg_str[inst->rd_num]    << ", "
                   << kite_reg_str[inst->rs1_num]   << ", "
                   << inst->imm;
                // Show register values.
                if(details) {
                    ss << " ["
                       << kite_opcode_str[inst->op] << " "
                       << inst->rd_val              << ", "
                       << inst->rs1_val             << ", "
                       << inst->imm
                       << "]";
                }
            }
            break;
        }
        case op_s_type: {
            // S-type format: op rs2, imm(rs1)
            ss << kite_opcode_str[inst->op]     << " "
               << kite_reg_str[inst->rs2_num]   << ", " 
               << inst->imm                     << "("
               << kite_reg_str[inst->rs1_num]   << ")";
            // Show register values.
            if(details) {
                ss << " ["
                   << kite_opcode_str[inst->op] << " "
                   << inst->rs2_val             << ", "
                   << inst->imm                 << "("
                   << inst->rs1_val             << ")"
                   << "]";
            }
            break;
        }
        case op_sb_type: {
            // SB-type format: op rs1, rs2, imm
            ss << kite_opcode_str[inst->op]     << " "
               << kite_reg_str[inst->rs1_num]   << ", " 
               << kite_reg_str[inst->rs2_num]   << ", "
               << inst->imm                     << "("
               << inst->label                   << ")";
            // Show register values.
            if(details) {
                ss << " ["
                   << kite_opcode_str[inst->op] << " "
                   << inst->rs1_val             << ", "
                   << inst->rs2_val             << ", "
                   << inst->imm                 << "("
                   << inst->label               << ")"
                   << "]";
            }
            break;
        }
        case op_u_type: {
            // U-type format: op rd, imm
            ss << kite_opcode_str[inst->op]     << " "
               << kite_reg_str[inst->rd_num]    << ", "
               << inst->imm;
            // Show register values.
            if(details) {
                ss << " ["
                   << kite_opcode_str[inst->op] << " "
                   << inst->rd_val              << ", "
                   << inst->imm
                   << "]";
            }
            break;
        }
        case op_uj_type: {
            // UJ-type format: op rd, imm
            ss << kite_opcode_str[inst->op]     << " "
               << kite_reg_str[inst->rd_num]    << ", " 
               << inst->imm                     << "("
               << inst->label                   << ")";
            // Show register values.
            if(details) {
                ss << " ["
                   << kite_opcode_str[inst->op] << " "
                   << inst->rd_val              << ", "
                   << inst->imm                 << "("
                   << inst->label               << ")"
                   << "]";
            }
            break;
        }
        default: {
            // Nop: op
            ss << kite_opcode_str[inst->op];
            break;
        }
    }
    return ss.str();
}


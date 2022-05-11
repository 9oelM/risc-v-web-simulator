#include <iostream>
#include "alu.h"

using namespace std;

alu_t::alu_t(uint64_t *m_ticks) :
    ticks(m_ticks),
    exit_ticks(0),
    run_inst(0) {
}

alu_t::~alu_t() {
}

// Get an instruction leaving the ALU. It may take multiple cycles for the ALU
// to execute instructions depending on their types.
inst_t* alu_t::get_output() {
    inst_t *inst = 0;
    // The instruction has been staying enough number of ticks in the ALU.
    if(*ticks >= exit_ticks) {
        inst = run_inst;
        run_inst = 0;
        // Mark the rd value of instruction is ready for forwarding.
        // The rd value of ld instruction becomes ready in the memory stage.
#ifdef DATA_FWD
        if(inst && (inst->rd_num > 0) && (inst->op != op_ld)) {
            inst->rd_ready = true;
        }
#endif
    }
    return inst;
}

// Is ALU free?
bool alu_t::is_free() {
    return !run_inst;
}

// Execute an instruction.
void alu_t::run(inst_t *m_inst) {
    // Set run_inst and its exit ticks that the run_inst can leave the ALU.
    run_inst = m_inst;
    exit_ticks = *ticks + m_inst->alu_latency - 1;

    // Divide-by-zero exception
    bool divide_by_zero = false;

    // ALU operations for different type of instructions.
    switch(m_inst->op) {
        case op_add:  { m_inst->rd_val = m_inst->rs1_val + m_inst->rs2_val; break; }
        case op_and:  { m_inst->rd_val = m_inst->rs1_val & m_inst->rs2_val; break; }
        case op_div:  { divide_by_zero = (m_inst->rs2_val == 0);
                        m_inst->rd_val = m_inst->rs1_val / (divide_by_zero ?
                                         1 : m_inst->rs2_val); break; }
        case op_divu: { divide_by_zero = (m_inst->rs2_val == 0);
                        m_inst->rd_val = uint64_t(m_inst->rs1_val) / (divide_by_zero ?
                                         1 : uint64_t(m_inst->rs2_val)); break; }
        case op_mul:  { m_inst->rd_val = m_inst->rs1_val * m_inst->rs2_val; break; }
        case op_or:   { m_inst->rd_val = m_inst->rs1_val | m_inst->rs2_val; break; }
        case op_rem:  { divide_by_zero = (m_inst->rs2_val == 0);
                        m_inst->rd_val = m_inst->rs1_val % (divide_by_zero ?
                                         1 : m_inst->rs2_val); break; }
        case op_remu: { divide_by_zero = (m_inst->rs2_val == 0);
                        m_inst->rd_val = uint64_t(m_inst->rs1_val) % (divide_by_zero ?
                                         1 : uint64_t(m_inst->rs2_val)); break; }
        case op_sll:  { m_inst->rd_val = m_inst->rs1_val << m_inst->rs2_val; break; }
        case op_sra:  { m_inst->rd_val = m_inst->rs1_val >> m_inst->rs2_val; break; }
        case op_srl:  { m_inst->rd_val = uint64_t(m_inst->rs1_val) >> m_inst->rs2_val; break; }
        case op_sub:  { m_inst->rd_val = m_inst->rs1_val - m_inst->rs2_val; break; }
        case op_xor:  { m_inst->rd_val = m_inst->rs1_val ^ m_inst->rs2_val; break; }
        case op_addi: { m_inst->rd_val = m_inst->rs1_val + m_inst->imm; break; }
        case op_andi: { m_inst->rd_val = m_inst->rs1_val & m_inst->imm; break; }
        case op_jalr: { m_inst->rd_val = m_inst->pc + 4; break; }
        case op_slli: { m_inst->rd_val = m_inst->rs1_val << m_inst->imm; break; }
        case op_srai: { m_inst->rd_val = m_inst->rs1_val >> m_inst->imm; break; }
        case op_srli: { m_inst->rd_val = uint64_t(m_inst->rs1_val) >> m_inst->imm; break; }
        case op_ori:  { m_inst->rd_val = m_inst->rs1_val | m_inst->imm; break; }
        case op_xori: { m_inst->rd_val = m_inst->rs1_val ^ m_inst->imm; break; }
        case op_ld:  
        case op_sd:   { m_inst->memory_addr  = m_inst->rs1_val + m_inst->imm; break; }
        case op_beq:  { m_inst->branch_target = (m_inst->rs1_val == m_inst->rs2_val) ? 
                                                (m_inst->pc + (m_inst->imm << 1)) :
                                                (m_inst->pc + 4); break; }
        case op_bge:  { m_inst->branch_target = (m_inst->rs1_val >= m_inst->rs2_val) ? 
                                                (m_inst->pc + (m_inst->imm << 1)) :
                                                (m_inst->pc + 4); break; }
        case op_blt:  { m_inst->branch_target = (m_inst->rs1_val < m_inst->rs2_val) ? 
                                                (m_inst->pc + (m_inst->imm << 1)) :
                                                (m_inst->pc + 4); break; }
        case op_bne:  { m_inst->branch_target = (m_inst->rs1_val != m_inst->rs2_val) ? 
                                                (m_inst->pc + (m_inst->imm << 1)) :
                                                (m_inst->pc + 4); break; }
        case op_lui:  { m_inst->rd_val = m_inst->imm << 20; break; }
        case op_jal:  { m_inst->rd_val = m_inst->pc + 4; break; }
        default:      { break; } // Nothing to do
    }
#ifdef DEBUG
    if(divide_by_zero) {
        cout << *ticks << " : alu : divide-by-zero exception" << endl;
    } 
    if(exit_ticks > *ticks) {
        cout << *ticks << " : alu : " << get_inst_str(run_inst, true) << endl;
    }
#endif
}

// Remove an instruction from the ALU.
inst_t* alu_t::flush() {
    inst_t *inst = run_inst;
    run_inst = 0;
    return inst;
}


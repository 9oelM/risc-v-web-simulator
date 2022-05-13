#include <iomanip>
#include <iostream>
#include <sstream>
#include "proc.h"

using namespace std;

proc_t::proc_t(
    int8_t *is_debug_on,
    int8_t *is_data_fwd_on,
    int8_t *is_br_pred_on
) :
    stalls(0),
    num_insts(0),
    is_debug_on(is_debug_on),
    is_data_fwd_on(is_data_fwd_on),
    is_br_pred_on(is_br_pred_on),
    num_flushes(0),
    ticks(0),
    pc(4),  // The first instruction is loaded from PC = 4.
    inst_memory(0),
    br_predictor(0),
    br_target_buffer(0),
    reg_file(0),
    alu(0),
    data_memory(0),
    data_cache(0) {

    if (*is_debug_on) {
        num_br_predicts = 0;
        num_br_mispredicts = 0;
    }
}

proc_t::~proc_t() {
    // Deallocate datapath elements.
    delete inst_memory;
    delete br_predictor;
    delete br_target_buffer;
    delete reg_file;
    delete alu;
    delete data_memory;
    delete data_cache;
}

// Processor initialization
void proc_t::init(
    const char *m_program_code, 
    const char *memory_state, 
    const char *reg_state
) {
    inst_memory = new inst_memory_t(m_program_code);    // Create an instruction memory.
    br_predictor = new br_predictor_t(16);              // Create a branch predictor.
    br_target_buffer = new br_target_buffer_t(16);      // Create a branch target buffer.
    reg_file = new reg_file_t(reg_state);                        // Create a register file.
    alu = new alu_t(&ticks, is_debug_on, is_data_fwd_on);;                            // Create an ALU.

    data_memory = new data_memory_t(memory_state, &ticks, 4096, 0);   // Create a data memory.
    data_cache = new data_cache_t(&ticks, 1024, is_debug_on, is_data_fwd_on, 8, 1);  // Create a data cache.
    data_memory->connect(data_cache);                   // Connect the memory to cache.
    data_cache->connect(data_memory);                   // Connect the cache to memory.
}

// Run the processor pipeline.
void proc_t::run(std::ostringstream& program_log) {
    program_log << "Start running ..." << endl;
    while(!ticks || if_id_preg.read()  || id_ex_preg.read()  ||
                    ex_mem_preg.read() || mem_wb_preg.read() ||
                    !alu->is_free()    || !data_cache->is_free()) {
        // Increment clock ticks.
        ticks++;
        // Process pipeline stages backwards.
        writeback(program_log);
        memory(program_log);
        execute(program_log);
        decode(program_log);
        fetch(program_log);
    }
    program_log << "Done." << endl;
    // Print pipeline stats.
    print_stats(program_log);
}

// Writeback stage
void proc_t::writeback(std::ostringstream& program_log) {
    // Read an instruction from the MEM/WB pipeline register.
    inst_t *inst = mem_wb_preg.read();
    if(inst) {
        // Update the number of executed instructions.
        num_insts++;
        // Remove the instruction from the MEM/WB pipeline register.
        mem_wb_preg.clear();
        // Write a result to the register file. Discard the x0 register.
        if(inst->rd_num > 0) {
            reg_file->write(inst, inst->rd_num, inst->rd_val);
        }
        if (*is_debug_on) {
            program_log << ticks << " : writeback : " << get_inst_str(inst, true) << endl;
        }
        // Update the branch predictor and branch target buffer for conditional branches.
        if(inst->branch_target) {
            if (*is_br_pred_on) {
                num_br_predicts++;
                bool is_taken = (inst->branch_target != (inst->pc+4));
                br_predictor->update(inst->pc, is_taken);
                if(is_taken) {
                    br_target_buffer->update(inst->pc, inst->branch_target);
                }
                // Predicted branch target and actual branch target are different.
                // Flush and restart the pipeline.
                if(inst->pred_target != inst->branch_target) {
                    // A branch mis-prediction (i.e., direction) or target mis-prediction
                    // (i.e., address) needs to flush the pipeline.
                    num_br_mispredicts += (inst->pred_taken != is_taken);
                    // Flush the pipeline, and set a correct PC.
                    flush();
                    pc = inst->branch_target;
                    if (*is_debug_on) {
                        program_log << ticks << " : pipeline flush : restart at PC = "     << pc << endl;
                    }
                }
            }
             else {
                // No branch prediction is used. The next PC of a branch is set here to avoid
                // speculative executions.
                pc = inst->branch_target;
            }
        }
        // Retire the instruction.
        delete inst;
    }
}

// Memory stage
void proc_t::memory(std::ostringstream& program_log) {
    static inst_t *mem_inst = 0;
    // Memory stage makes a progress only if the MEM/WB pipeline register is free.
    if(mem_wb_preg.is_free()) {
        // An instruction is read from the EX/MEM pipeline register.
        if(data_cache->is_free() && (mem_inst = ex_mem_preg.read())) {
            // Remove the instruction from the EX/MEM pipeline register.
            ex_mem_preg.clear();
            // Access the data memory for a load or store.
            if(mem_inst->op == op_ld) { data_cache->read(mem_inst, program_log); }
            else if(mem_inst->op == op_sd) { data_cache->write(mem_inst, program_log); }
        }
        // Data cache is done with the instruction.
        if(!data_cache->run(program_log)) {
            // Write the instruction in the MEM/WB pipeline register.
            mem_wb_preg.write(mem_inst); mem_inst = 0;
        }
    }
    if (*is_debug_on) {
        inst_t *inst = mem_wb_preg.read();
        if(inst) {
            program_log << ticks << " : memory : " << get_inst_str(inst, true) << endl;
        }
    }
}

// Execute stage
void proc_t::execute(std::ostringstream& program_log) {
    inst_t *inst = 0;
    // Execution stage makes a progress only if the EX/MEM pipeline register is free.
    if(ex_mem_preg.is_free()) {
        // An instruction is read from the ID/EX pipeline register.
        if((inst = id_ex_preg.read()) && alu->is_free()) {
            // Remove the instruction from the ID/EX pipeline register, and let the ALU
            // execute the instruction.
            id_ex_preg.clear();
            alu->run(inst, program_log);
        }
        // ALU is done with the instruction.
        if((inst = alu->get_output())) {
            // Write the instruction in the EX/MEM pipeline register.
            ex_mem_preg.write(inst);
        }
    }
    if (*is_debug_on) {
        if((inst = ex_mem_preg.read())) {
            program_log << ticks << " : execute : " << get_inst_str(inst, true) << endl;
        }
    }
}

// Instruction decode stage
void proc_t::decode(std::ostringstream& program_log) {
    inst_t *inst = 0;
    // Decode stage makes a progress only if the ID/EX pipeline register is free.
    if(id_ex_preg.is_free()) {
        // Read an instruction from the IF/ID pipeline register.
        if((inst = if_id_preg.read())) {
            // Check the data dependency of instruction.
            if(!reg_file->dep_check(inst)) {
                // Remove the instruction from the IF/ID pipeline register.
                if_id_preg.clear();
                // Write the instruction in the ID/EX pipeline register.
                id_ex_preg.write(inst);
                // Update the PC for an unconditional jump.
                if(inst->op == op_jalr) { pc = (inst->rs1_val + inst->imm) & -2; }
                else if(inst->op == op_jal) { pc = inst->pc + (inst->imm<<1); }
            }
        }
    }
    if (*is_debug_on) {
        if((inst = id_ex_preg.read())) {
            program_log << ticks << " : decode : " << get_inst_str(inst, true) << endl;
        }
    }
}

// Instruction fetch stage
void proc_t::fetch(std::ostringstream& program_log) {
    inst_t *inst = 0;
    // Fetch stage makes a progress only if the IF/ID pipeline register is free.
    if(if_id_preg.is_free()) {
        // Read an instruction from the instruction memory.
        if((inst = inst_memory->read(pc))) {
            // Update the PC.
            pc += 4;
            // Write an instruction in the IF/ID pipeline register.
            if_id_preg.write(inst);
            // Make a branch prediction for a conditional branch.
            if(get_op_type(inst->op) == op_sb_type) {
                if (*is_br_pred_on) {
                    // Set the PC to a branch target if the branch is predicted to be taken.
                    inst->pred_taken = br_predictor->is_taken(inst->pc);
                    pc = inst->pred_target = inst->pred_taken ?
                                            br_target_buffer->get_target(inst->pc) : pc;
                } else {
                    // No branch prediction is used.
                    // Instruction fetch is disabled until the next PC is resolved.
                    pc = 0;
                }
            }
        }
    }
    else {
        // Preceding instruction is blocking. Pipeline stalls.
        stalls++;
    }
    if (*is_debug_on) {
        if((inst = if_id_preg.read())) {
            program_log << ticks << " : fetch : " << get_inst_str(inst, true) << endl;
        }
    }
}

// Flush the pipeline. The pipeline uses a simplest stall-and-drain approach to
// correct mis-speculative executions.
void proc_t::flush() {
    inst_t *inst = 0;
    // Clear all pipeline registers.
    if((inst = if_id_preg.read()))  { delete inst; if_id_preg.clear();  }
    if((inst = id_ex_preg.read()))  { delete inst; id_ex_preg.clear();  }
    if((inst = ex_mem_preg.read())) { delete inst; ex_mem_preg.clear(); }
    if((inst = mem_wb_preg.read())) { delete inst; mem_wb_preg.clear(); }
    // Flush ALU.
    if((inst = alu->flush())) { delete inst; }
    // Flush the dependency check state of register file.
    reg_file->flush();
    num_flushes++;
}

// Print pipeline stats.
void proc_t::print_stats(std::ostringstream& program_log) {
    program_log << endl << "======== [Kite Pipeline Stats] =========" << endl;
    program_log << "Total number of clock cycles = " << ticks << endl;
    program_log << "Total number of stalled cycles = " << stalls << endl;
    program_log << "Total number of executed instructions = " << num_insts << endl;
    program_log.precision(3);
    program_log << "Cycles per instruction = " << fixed
         << double(ticks) / double(num_insts) << endl;
    if (*is_br_pred_on) {
        program_log << "Number of pipeline flushes = " << num_flushes << endl;
        program_log << "Branch prediction accuracy = " << fixed
            << (num_br_predicts ?
                double(num_br_predicts-num_br_mispredicts) / double(num_br_predicts) : 0)
            << " (" << num_br_predicts-num_br_mispredicts << "/" << num_br_predicts
            << ")" << endl;
    }
    program_log.precision(-1);
    // Print data cache stats.
    data_cache->print_stats(program_log);
    // Print register file state.
    reg_file->print_state(program_log);
    // Print data memory state.
    data_memory->print_state(program_log);
    program_log << endl << "======== [End of Pipeline Stats] =========" << endl;
}


#ifndef __KITE_PROC_H__
#define __KITE_PROC_H__

#include <stdint.h>
#include <sstream>
#include "alu.h"
#include "br_predictor.h"
#include "data_cache.h"
#include "data_memory.h"
#include "inst_memory.h"
#include "pipe_reg.h"
#include "reg_file.h"

class proc_t {
public:
    proc_t(
        bool *is_debug_on,
        bool *is_data_fwd_on,
        bool *is_br_pred_on
    );
    ~proc_t();

    void init(
        const char *m_program_code, 
        const char *memory_state, 
        const char *reg_state
    );  // Processor initialization
    void run(std::ostringstream& program_log);                             // Run the processor pipeline.

private:
    void writeback();                       // Writeback stage
    void memory();                          // Memory stage
    void execute();                         // Execute stage
    void decode();                          // Instruction decode stage
    void fetch();                           // Instruction fetch stage
    void flush();                           // Flush pipeline.
    void print_stats(std::ostringstream& program_log);                     // Print pipeline stats.

    uint64_t stalls;                        // Number of stall cycles
    uint64_t num_insts;                     // Number of instructions
// #ifdef BR_PRED
    uint64_t num_br_predicts;               // Number of branch predictions
    uint64_t num_br_mispredicts;            // Number of branch mis-predictions
// #endif
    uint64_t num_flushes;                   // Number of pipeline flushes
    uint64_t ticks;                         // Clock ticks (cycles)
    uint64_t pc;                            // Program counter

    inst_memory_t *inst_memory;             // Instruction memory
    br_predictor_t *br_predictor;           // Branch predictor
    br_target_buffer_t *br_target_buffer;   // Branch target buffer
    reg_file_t *reg_file;                   // Register file
    alu_t *alu;                             // ALU
    data_memory_t *data_memory;             // Data memory
    data_cache_t *data_cache;               // Data cache
    pipe_reg_t if_id_preg, id_ex_preg;      // Pipeline registers
    pipe_reg_t ex_mem_preg, mem_wb_preg;

    bool *is_debug_on;
    bool *is_data_fwd_on;
    bool *is_br_pred_on;
};

#endif


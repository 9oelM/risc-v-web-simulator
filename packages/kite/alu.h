#ifndef __KITE_ALU_H__
#define __KITE_ALU_H__

#include <stdint.h>
#include "inst.h"

// Arithmetic-logical unit (ALU)
class alu_t {
public:
    alu_t(uint64_t *m_ticks, int8_t *is_debug_on, int8_t *is_data_fwd_on);
    ~alu_t();

    inst_t* get_output();       // Get an instruction leaving the ALU.
    bool is_free();             // Is ALU free?
    void run(inst_t *m_inst, std::ostringstream& program_log);   // Execute an instruction.
    inst_t* flush();            // Remove an instruction from the ALU.

private:
    uint64_t *ticks;            // Pointer to processor clock ticks
    uint64_t exit_ticks;        // Exit ticks that a run_inst can leave the ALU
    inst_t *run_inst;           // An instruction currently being executed
    int8_t *is_data_fwd_on;
    int8_t *is_debug_on;
};

#endif


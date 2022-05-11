#ifndef __KITE_PIPE_REG_H__
#define __KITE_PIPE_REG_H__

#include "inst.h"

// Pipeline register
class pipe_reg_t {
public:
    pipe_reg_t();
    ~pipe_reg_t();

    inst_t* read() const;           // Read an instruction from the pipeline register.
    void write(inst_t *m_inst);     // Write an instruction into the pipeline register.
    void clear();                   // Remove an instruction from the pipeline register.
    bool is_free();                 // Is the pipeline register free?

private:
    inst_t *inst;                   // An instruction currently in the pipeline register
};

#endif


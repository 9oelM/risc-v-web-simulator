#include "pipe_reg.h"

pipe_reg_t::pipe_reg_t() :
    inst(0) {
}

pipe_reg_t::~pipe_reg_t() {
}

// Read an instruction from the pipeline register.
inst_t* pipe_reg_t::read() const {
    return inst;
}

// Write an instruction into the pipeline register.
void pipe_reg_t::write(inst_t *m_inst) {
    inst = m_inst;
}

// Remove an instruction from the pipeline register.
void pipe_reg_t::clear() {
    inst = 0;
}

// Is the pipeline register free?
bool pipe_reg_t::is_free() {
    return !inst;
}


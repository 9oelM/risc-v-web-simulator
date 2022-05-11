#include <cstring>
#include "br_predictor.h"

// Branch predictor
br_predictor_t::br_predictor_t(uint64_t m_size) :
    counters(0) {
    num_entries = m_size;
}

br_predictor_t::~br_predictor_t() {
    // Deallocate the counter array.
    delete [] counters;
}

// Is a branch predicted to be taken?
bool br_predictor_t::is_taken(uint64_t m_pc) {
    // Predict always not taken.
    return false;
}

// Update a prediction counter.
void br_predictor_t::update(uint64_t m_pc, bool m_taken) {
}



// Branch target buffer
br_target_buffer_t::br_target_buffer_t(uint64_t m_size) :
    buffer(0) {
    num_entries = m_size;
}

br_target_buffer_t::~br_target_buffer_t() {
    // Deallocate the target address array.
    delete [] buffer;
}

// Get a branch target address.
uint64_t br_target_buffer_t::get_target(uint64_t m_pc) {
    // Always return PC = 0.
    return 0;
}

// Update the branch target buffer.
void br_target_buffer_t::update(uint64_t m_pc, uint64_t m_target_addr) {
}


#ifndef __BR_PRED_H__
#define __BR_PRED_H__

#include "stdint.h"

// Branch predictor
class br_predictor_t {
public:
    br_predictor_t(uint64_t m_size);
    ~br_predictor_t();

    bool is_taken(uint64_t m_pc);                       // Is a branch predicted to be taken?
    void update(uint64_t m_pc, bool m_taken);           // Update a prediction counter.

private:
    uint64_t num_entries;                               // Number of counters
    int *counters;                                      // Counter array
};

// Branch target buffer
class br_target_buffer_t {
public:
    br_target_buffer_t(uint64_t m_size);
    ~br_target_buffer_t();

    uint64_t get_target(uint64_t m_pc);                 // Get a branch target address.
    void update(uint64_t m_pc, uint64_t m_target_addr); // Update the branch target buffer.

private:
    uint64_t num_entries;                               // Number of target addresses
    uint64_t *buffer;                                   // Target address array
};

#endif


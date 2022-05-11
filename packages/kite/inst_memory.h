#ifndef __KITE_INST_MEMORY_H__
#define __KITE_INST_MEMORY_H__

#include <map>
#include <vector>
#include "inst.h"

class core_t;

// Instruction memory
class inst_memory_t {
public:
    inst_memory_t(const char *m_program_code);
    ~inst_memory_t();

    inst_t* read(uint64_t m_pc);            // Read an instruction from memory.
    size_t num_insts() const;               // Get the total number of instructions in memory.

private:
    // Load a program code.
    void load_program_code(const char *m_program_code);
    // Parse instruction string, and convert it to Kite instruction.
    void parse_inst_str(std::string m_inst_str, size_t m_line_num);

    std::vector<inst_t> memory;             // Instruction memory
    std::map<std::string, int64_t> labels;  // Code labels
};

#endif


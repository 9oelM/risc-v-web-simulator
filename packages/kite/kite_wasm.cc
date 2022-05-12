#include <iostream>
#include <sstream>
#include "proc.h"
#include "string"

using namespace std;
extern "C"
{
  inline const char *cstr(const std::string &message)
  {
    auto buffer = (char *)malloc(message.length() + 1);
    cout << "Allocating at " << (void *)buffer << endl;
    buffer[message.length()] = '\0';
    memcpy(buffer, message.data(), message.length());
    return buffer;
  }
  const char *run_kite_once(
      const char *program_code, 
      const char *memory_state, 
      const char *reg_state,
      bool is_debug_on,
      bool is_data_fwd_on,
      bool is_br_pred_on
    )
  {
    proc_t proc;                                      // Kite processor
    proc.init(program_code, memory_state, reg_state); // Processor initialization
    std::ostringstream program_log;
    proc.run(program_log); // Processor runs.
    std::string program_output = std::move(program_log).str();
    std::cout << program_output;
    return cstr(program_output);
  }
  const char *get_exception_message(int exception_ptr)
  {
    return cstr(std::string(reinterpret_cast<std::exception *>(exception_ptr)->what()));
  }
}

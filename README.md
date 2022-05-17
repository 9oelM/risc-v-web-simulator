# risc-v-web-simulator

Yet another RISC-V Simulator on the web, for fun. Based on [Kite](https://github.com/yonsei-icsl/kite), RISC-V architecture simulator I used for my computer architecture class ([EEE3530](https://icsl.yonsei.ac.kr/eee3530/)) at Yonsei University. Turned it into Webassembly to use it on web. Again, it's just for fun.... and probably education. Lol.

## Use it!

https://riscv.vercel.app/

## Instructions

Detailed instruction on how to use it is found at [the repository of Kite](https://github.com/yonsei-icsl/kite).

## Developing

### Modification of Kite's code
To enable communication with javascript from Webassembly binary, a few things have been changed in Kite's code:

- Kite does not receive files as an input anymore. It receives `const char* program_code, const char* memory_state, const char* reg_state` as parameters and runs it. `const char*` is directly supplied from javascript.
- No more build flags (`-DDEBUG`, `-DDATA_FWD`, `-DBR_PRED`); They are also directly supplied from javascript as well.
- Kite throws error instead of `cerr` and `exit(1);`. For example: 
    ```cpp
    if(val != 1) {
        throw std::logic_error("Cache Error: number of sets must be a power of two");
    }
    ```
  This allows javascript to catch an error and display the error message.
- [Emscripten](https://github.com/emscripten-core/emscripten) is used to compile C++ into Webassembly. More details in compile.sh.

## Todo
- cleanup duplicate css styles (now just copied and pasted cuz im lazy)

## References
- https://github.com/9oelM/emscripten-cplusplus-webpack-example
- https://stackoverflow.com/questions/21816960/how-to-pass-strings-between-c-and-javascript-via-emscripten
- https://stackoverflow.com/questions/46815205/how-to-pass-a-string-to-c-code-compiled-with-emscripten-for-webassembly
- https://stackoverflow.com/questions/59532379/how-to-call-javascript-method-from-c-with-parameters-using-em-js
- https://marcoselvatici.github.io/WASM_tutorial/
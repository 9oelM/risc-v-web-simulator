#!/bin/bash

# EXPORST_NAME means we can import from fib.js as follows:
# import { fib } from './fib.js'
# and fib will contain the module with webassembly

# EXPORTED_FUNCTIONS is the list of functions
# exported from C. Make sure you put them into extern "C" {} block in your c++ code. 
# Then simply prefix the functions you are going to export with an underscore, and add it to the list below

# Uncomment -s "FILESYSTEM=0" if you don't need to use fs

# if you create more dependencies of fib.cc, simply add them to the end of the below command, like: -o ./fib.js fib.cc add.cc anotherdep.cc and_so_on.cc
em++ -O3 -s WASM=1 -s EXPORTED_RUNTIME_METHODS='[\"cwrap\"]' -s ALLOW_MEMORY_GROWTH=1 -s MODULARIZE=1 -s 'EXPORT_NAME="fib"' -s 'EXPORTED_FUNCTIONS=["_fib"]' -s "ENVIRONMENT='web'" -o ./fib.js fib.cc add.cc
    # -s "FILESYSTEM=0"
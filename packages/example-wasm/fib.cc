#include "add.h"
#include "fib.h"

// extern "C" : prevent function names from being mangled when compiled so that your JavaScript code can use the expected function name
extern "C" {
  int fib(int n) {
    int i, t, a = 0, b = 1;
    for (i = 0; i < n; i++) {
      t = add(a, b);
      a = b;
      b = t;
    }
    return b;
  }
}
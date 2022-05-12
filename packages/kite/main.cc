#include <iostream>

using namespace std;

int main() {
  bool val = true;
  bool* test = &val;
  std::cout << test << endl;
  std::cout << *test << endl;
}
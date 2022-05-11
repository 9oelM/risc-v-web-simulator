## Kite: Architecture Simulator for RISC-V Instruction Set
*Kite* is an architecture simulator that models a five-stage pipeline of RISC-V instruction set.
The initial version of Kite was developed in 2019 primarily for an educational purpose as a part of EEE3530 Computer Architecture.
Kite implements the five-stage pipeline model described in *Computer Organization and Design, RISC-V Edition: The Hardware and Software Interface by D. Patterson and J. Hennessey* ([Link to Amazon](https://www.amazon.com/Computer-Organization-Design-RISC-V-Architecture/dp/0128122757)).
The objective of Kite is to provide students with an easy-to-use simulation framework and precise timing model as described in the book.
It supports most of basic instructions introduced in the book such as `add`, `slli`, `ld`, `sd`, `beq` instructions.
Simulator users can easily compose RISC-V assembly programs and execute them through the provided pipeline model for entry-level architecture studies.
The pipeline model in Kite provides several functionalities including instruction dependency check (i.e., data hazards), pipeline stalls, data forwarding or bypassing (optional), branch predictions (optional), data cache structures, etc.

The five-stage pipeline model in Kite is implemented in C++.
Its objective is to have the apprentices of computer architecture experience architecture simulations with a simple, easy-to-use framework.
If students join the computer architecture world in their career (either product development or research), they will certainly have to use some sorts of architecture simulators for work.
The majority of architecture simulators are written in C/C++ since this programming language is the most suitable one to interface between computer hardware and software.

\
**Prerequisite, Download, and Build:**\
The simple implementation of Kite makes it really easy to install.
It requires only g++ compiler to build, and it does not depend on any other libraries or external tools to run.
It has been validated in Ubuntu 16.04 (Xenial), 18.04 (Bionic Beaver), 20.04 (Focal Fossa), and Mac OS 10.14 (Mojave), 10.15 (Catalina), 11 (Big Sur), 12 (Monterey).
The latest release of Kite is v1.8 (as of April, 2022).
To obtain a copy of Kite v1.8, use the following command in a terminal.
```
$ git clone ––branch v1.8 https://github.com/yonsei-icsl/kite
```

Try building and executing an example code with the following commands.
```
$ cd kite/
$ make -j
$ ./kite program_code
```

\
**Documentation:**\
For more detailed information, refer to the documentation available at doc/kite.pdf. Please, use the following to reference our work.
```
@misc{song_kite2019,
    author       = {W. Song},
    title        = {{Kite: An Architecture Simulator for RISC-V Instruction Set}},
    howpublished = {Yonsei University},
    month        = {May},
    year         = {2019},
    note         = {[Online], Available: \url{https://icsl.yonsei.ac.kr/kite}},
}
```


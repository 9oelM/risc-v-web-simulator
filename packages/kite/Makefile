CXX=g++
OPT=
CFLAG:=-g -Wall -O3 $(OPT)

SRC=$(wildcard *.cc)
HDR=$(wildcard *.h)
OBJ=$(SRC:.cc=.o)
EXE=kite

.PHONY: default clean

default: $(EXE)

$(EXE): $(OBJ)
	$(CXX) $(CFLAG) -o $@ $(OBJ)

%.o: %.cc $(HDR)
	$(CXX) $(CFLAG) -o $@ -c $<

clean:
	rm -f $(OBJ) $(EXE)
	cd doc; make clean


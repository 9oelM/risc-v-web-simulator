PAPER = kite
TEX = $(wildcard *.tex)
FIG = $(wildcard *.png)
PDF = $(wildcard *.pdf)

.PHONY: all clean

$(PAPER).pdf: $(TEX) $(FIG)
	rm -rf *.glsdefs
	pdflatex $(PAPER)
	pdflatex $(PAPER)

distclean:
	rm -rf *.glsdefs *.aux *.bbl *.blg *.log *.out

clean:
	make distclean; rm -f $(PAPER).pdf


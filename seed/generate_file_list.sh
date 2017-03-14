#!/bin/sh
curl -l ftp://ftp.ncbi.nlm.nih.gov/pubchem/Compound/CURRENT-Full/XML/ | sed -e "/\.xml\.gz/!d" > compound_files.txt

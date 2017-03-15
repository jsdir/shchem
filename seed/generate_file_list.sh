#!/bin/sh
curl -l ftp://ftp.ncbi.nlm.nih.gov/pubchem/Compound/CURRENT-Full/ASN/ | sed -e "/\.asn\.gz/!d" > compound_files.txt

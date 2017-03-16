#!/bin/bash
set -e

trap 'rm ./asn/$1*' EXIT
prefix="[$(grep -m 1 -n "$1" compound_files.txt | cut -f1 -d:)/$(wc -l compound_files.txt | cut -f1 -d ' ')] $1:"

echo "$prefix Downloading"
wget -nv -O - "ftp://ftp.ncbi.nlm.nih.gov/pubchem/Compound/CURRENT-Full/ASN/$1" | gunzip -c > ./asn/$1

echo "$prefix Converting to JSON"
./datatool -m pubchem.asn -d ./asn/$1 -pj ./asn/$1.json -t PC-Compounds

echo "$prefix Uploading to database"
node ./upload.js ./asn/$1.json

echo "$prefix Finished uploading"
echo $1 >> ./asn/finished.txt

exit 0

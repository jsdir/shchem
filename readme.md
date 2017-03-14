# Setup

## Generate the list of component files

This pulls a list of molecule files from
ftp://ftp.ncbi.nlm.nih.gov/pubchem/Compound/CURRENT-Full/XML/

```sh
cd seed
./generate_file_list.sh
```

## Seeding the database

```sh
node ./seed/seed.js
```

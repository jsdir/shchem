# Setup

## Seeding the database

### Setup Postgres

- If you want to run postgres locally:
  https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04
- Change the `DATABASE_URL` in `.env` to match the credentials of the running instance

      DATABASE_URL='postgres://gtiwrmbyatjafb:fc03424b351880356b5d0c611baee9c5f0c234e20d1920799753739aa356dce5@ec2-75-101-142-182.compute-1.amazonaws.com:5432/d3gsce3nipr26i'

### Migrate

```sh
./node_modules/.bin/sequelize db:migrate
```

### Begin uploading the compound data

```sh
npm run seed-compounds
```

## Updating the list of compound files

To update the list of component files, run:

```sh
cd seed
./generate_compound_files.sh
```

This pulls a list of files from
ftp://ftp.ncbi.nlm.nih.gov/pubchem/Compound/CURRENT-Full/ASN/

## Parser Information

- Pubchem schema: ftp://ftp.ncbi.nih.gov/pubchem/specifications/pubchem.xsd
- Example JSON record: https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/1650002/record/JSON/

# Setup

## Generate the list of component files

This pulls a list of molecule files from
ftp://ftp.ncbi.nlm.nih.gov/pubchem/Compound/CURRENT-Full/XML/

```sh
cd seed
./generate_file_list.sh
```

## Seeding the database

In order to seed the database, we manage the processing jobs
with [kue](https://github.com/Automattic/kue).

### Setup Redis

- https://redis.io/topics/quickstart
- Run `redis-server`

### Setup Postgres

- https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04

### Add the Tables

- Connect with `psql`
- Run the commands in `seed/table.sql`
- Run postgres
- Tweak the values in `seed/pool.js` to match the credentials of the running postgres instance.

### Seed the processing jobs

```sh
node ./seed/seed.js
```

### Run the processing cluster

```sh
node ./seed/cluster.js
```

Go to the admin panel at http://localhost:3000 to watch the progress. Tweak the
`clusterWorkerSize` value in `seed/cluster.js` to use more cores.

### Helpful commands

- start redis: `docker run --name shredis -p 6379:6379 -d redis:alpine`
- reset redis: `docker exec -it shredis redis-cli -c FLUSHALL`
- start postgres: `docker run --name shpostgres -p 5432:5432 -d postgres:9.6.2-alpine`

## Parser

ftp://ftp.ncbi.nih.gov/pubchem/specifications/pubchem.xsd
https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/1650002/record/JSON/

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

### Seed the processing jobs

```sh
node ./seed/seed.js
```

### Run the processing cluster

```sh
node ./seed/cluster.js
```

Go to the admin panel at http://localhost:3000 to watch the progress.

### Helpful commands

- start redis: `docker run --name shredis -p 6379:6379 -d redis:alpine`
- reset redis: `docker exec -it shredis redis-cli -c FLUSHALL`

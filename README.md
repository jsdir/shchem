# shchem

[![Travis](https://img.shields.io/travis/martinshkreli/shchem.svg)](https://travis-ci.org/martinshkreli/shchem)

Live at https://shchem.herokuapp.com

## Setup

### Seeding the database

#### Setup Postgres

- If you want to run postgres locally:
  https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04
- Change the `DATABASE_URL` in `.env` to match the credentials of the running instance

      DATABASE_URL='postgres://gtiwrmbyatjafb:fc03424b351880356b5d0c611baee9c5f0c234e20d1920799753739aa356dce5@ec2-75-101-142-182.compute-1.amazonaws.com:5432/d3gsce3nipr26i'

#### Migrate

```sh
./node_modules/.bin/sequelize db:migrate
```

#### Begin uploading the compound data

```sh
npm run seed-compounds
```

### Updating the list of compound files

To update the list of component files, run:

```sh
cd seed
./generate_compound_files.sh
```

This pulls a list of files from
ftp://ftp.ncbi.nlm.nih.gov/pubchem/Compound/CURRENT-Full/ASN/

### Running the app

You need the following environment variables:

- `DATABASE_URL`: path to your postgres database
- `BABEL_PATH`: path to the `babel` binary of [Open Babel](http://openbabel.org/wiki/Main_Page)
- `IDOCK_PATH`: path to the `idock` binary of [idock](https://github.com/HongjianLi/idock)

### Parser Information

- Pubchem schema: ftp://ftp.ncbi.nih.gov/pubchem/specifications/pubchem.xsd
- Example JSON record: https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/1650002/record/JSON/

## Testing

To test everything:
```sh
npm test
```

To only test the client:
```sh
npm run test-client
```

To only test the server:
```sh
npm run test-server
```

Run server tests on file change:
```sh
npm run test-server -- -w
```

## Docking

To run the worker:

- Setup a redis instance, then:

```sh
npm run worker
```

## Other Resources

- Molecular Docking
  - Search/scoring algorithms
    - https://www.researchgate.net/profile/Raquel_Dias2/publication/23763093_Molecular_Docking_Algorithms/links/02e7e524de3bfd2b11000000.pdf (Table 1. Docking Algorithms)
    - bsp-slim
      - site: http://zhanglab.ccmb.med.umich.edu/BSP-SLIM
      - paper: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3240723
    - autodock vina
      - site: http://vina.scripps.edu
      - paper: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3041641
      - source: https://github.com/jandom/autodock-vina
    - mcdock
      - paper: https://www.ncbi.nlm.nih.gov/pubmed/10483527
      - source: https://github.com/andersx/mcdock
  - Online Services
    - istar
      - paper: http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0085678
      - engine: https://github.com/HongjianLi/idock
      - service: http://istar.cse.cuhk.edu.hk/idock
    - swissdock
      - paper: https://academic.oup.com/nar/article-pdf/39/suppl_2/W270/7628003/gkr366.pdf
      - service: http://www.swissdock.ch/docking
    - blaster
      - paper: http://pubs.acs.org/doi/pdf/10.1021/jm9006966
    - patchdock
      - paper: http://bioinfo3d.cs.tau.ac.il/PatchDock/wabi02.pdf
      - service: http://bioinfo3d.cs.tau.ac.il/PatchDock/index.html
  - Distributed docking simulations
    - Docking@Home
      - site: http://docking.cis.udel.edu
      - papers
        - https://gcl.cis.udel.edu/publications/conferences/13_CSE_zhang.pdf
        - http://dl.acm.org/citation.cfm?id=2305618
        - https://gcl.cis.udel.edu/publications/conferences/12_HPCC_paper.pdf
      - source
        - https://github.com/TauferLab
        - https://github.com/TauferLab/Data-Reduction-and-Octree-based-Clustering-of-Ligand-Conformations-in-MRMPI
    - AutoDockCloud
      - paper: http://dl.acm.org/citation.cfm?id=2768050
    - wfredow
      - paper: https://www.hindawi.com/journals/bmri/2013/469363

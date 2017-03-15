const processFile = require('./processFile')

processFile({
  data: { file: 'Compound_000400001_000425000.asn.gz' },
  log: console.log,
  progress: console.log
}, console.log);

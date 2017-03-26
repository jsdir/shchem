require('dotenv').config();

var queue = require('../queue');

queue.processDockingJob(function(job, done) {
  // see https://github.com/OptimalBits/bull
  done(null, {
    foo: 'bar',
    ligandCid: job.data.ligandCid,
    proteinId: job.data.proteinId
  });
});

console.log('started shchem worker');

var queue = require('../queue');

queue.processDockingJob(function(job, done) {
  // see https://github.com/OptimalBits/bull
  console.log(job)
  done(null, {
    foo: 'bar',
    ligandCid: job.data.ligandCid,
    proteinId: job.data.proteinId
  });
});

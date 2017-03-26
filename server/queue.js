var Queue = require('bull');

var dockingJobQueue = Queue('docking', 6379, '127.0.0.1');

module.exports.addDockingJob = function(data, cb) {
  dockingJobQueue.add(data).then(job => {
    cb(job.jobId);
  });
};

module.exports.processDockingJob = function(job, done) {
  dockingJobQueue.process(job, done);
};

module.exports.onDockingJobCompleted = function(cb) {
  dockingJobQueue.on('global:completed', function(job, result) {
    cb(job, result);
  });
};

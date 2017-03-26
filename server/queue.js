var Queue = require('bull');

var url = process.env.REDIS_URL || 'redis://localhost:6379';
var dockingJobQueue = Queue('docking', url);

module.exports.addDockingJob = function(data, cb) {
  dockingJobQueue.add(data).then(function(job) {
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

var Queue = require('bull');
var redisClient = require('../shared/redisClient');

var seedJobQueue = Queue('seed', redisUrl);
var startDockingJobQueue = Queue('startDocking', redisUrl);
var dockingJobQueue = Queue('docking', redisUrl);

module.exports.addSeedJob = function(filename) {
  seedJobQueue.add({ filename: filename });
};

module.exports.processSeedJob = function(job, done) {
  seedJobQueue.process(job, done);
};

module.exports.addStartDockingJob = function(data, cb) {
  startDockingJobQueue.add(data).then(function(job) {
    cb(job.jobId);
  });
};

module.exports.processStartDockingJob = function(job, done) {
  startDockingJobQueue.process(job, done);
};

module.exports.addDockingJob = function(data, cb) {
  dockingJobQueue.add(data).then(function(job) {
    cb(job.jobId);
  });
};

module.exports.processDockingJob = function(job, done) {
  dockingJobQueue.process(job, done);
};

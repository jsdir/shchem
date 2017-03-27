var Queue = require('bull');

var redisClient = require('../shared/redisClient');

var dockingJobQueue = Queue('docking', redisClient);
var startDockingJobQueue = Queue('startDocking', redisClient);
var seedJobQueue = Queue('seed', redisClient);

module.exports.addDockingJob = function(data, cb) {
  dockingJobQueue.add(data).then(function(job) {
    cb(job.jobId);
  });
};

module.exports.addSeedJob = function(filename) {
  seedJobQueue.add({ filename: filename });
};

module.exports.processDockingJob = function(job, done) {
  dockingJobQueue.process(job, done);
};

module.exports.processSeedJob = function(job, done) {
  seedJobQueue.process(job, done);
};

module.exports.onDockingJobCompleted = function(cb) {
  dockingJobQueue.on('global:completed', function(job, result) {
    cb(job, result);
  });
};

module.exports.addStartDockingJob = function(data, cb) {
  startDockingJobQueue.add(data).then(function(job) {
    cb(job.jobId);
  });
};

module.exports.processStartDockingJob = function(job, done) {
  startDockingJobQueue.process(job, done);
};

const Queue = require('bull');
const redisClient = require('../shared/redisClient');
const redisQueueClient = redisClient.create();
const redisQueueSubscriber = redisClient.create();

const queueOpts = {
  redis: {
    opts: {
      createClient: function(type){
        if (type == 'subscriber') return redisQueueSubscriber;
        if (type == 'client') return redisQueueClient;
        return redisClient.client;
      }
    }
  }
};
const seedJobQueue = Queue('seed', queueOpts);
const startDockingJobQueue = Queue('startDocking', queueOpts);
const dockingJobQueue = Queue('docking', queueOpts);

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

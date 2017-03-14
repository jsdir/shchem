const kue = require('kue');
const cluster = require('cluster');
const queue = kue.createQueue();
const processFile = require('./processFile');
const fs = require('fs');
const path = require('path');

const clusterWorkerSize = require('os').cpus().length;
const concurrency = 2;

if (cluster.isMaster) {
  kue.app.listen(3000);
  console.log('Running job admin panel at http://localhost:3000')
  for (var i = 0; i < clusterWorkerSize; i++) {
    cluster.fork();
  }
} else {
  queue.process('processFile', concurrency, processFile);
}

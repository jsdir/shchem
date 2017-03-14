const kue = require('kue');
const cluster = require('cluster');
const fs = require('fs');
const path = require('path');

const queue = kue.createQueue({
  jobEvents: false,
  disableSearch: true,
});

const files = fs.readFileSync(
  path.resolve(__dirname, 'compound_files.txt')
).toString().split('\n');

files.forEach(function(file) {
  if (!file) return
  console.log('queueing ' + file);
  queue.create('processFile', {
    title: 'Processing ' + file,
    file: file
  }).save();
});

console.log('done');

var fs = require('fs');
var path = require('path');
var readline = require('readline');
var queue = require('../queue')

var lineReader = readline.createInterface({
  input: fs.createReadStream(
    path.resolve(__dirname, '../../seed/compound_files.txt')
  )
});

var limit = parseInt(process.argv[2] || '0');
var count = 0;
lineReader.on('line', function(filename) {
  if (limit > 0 && count === limit) return;
  console.log('queuing job for', filename);
  queue.addSeedJob(filename);
  count++;
});

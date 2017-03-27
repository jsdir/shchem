var path = require('path');
var spawn = require('child_process').spawn;

module.exports = function(job, done) {
  var seedPath = path.resolve(__dirname, '../seed');

  console.log('processing ', job.data.filename);
  var proc = spawn('./process_file.sh', [job.data.filename], {
    cwd: seedPath,
  });

  proc.stdout.on('data', function(data) {
    console.log('stdout:', data.toString());
  });

  proc.stderr.on('data', function(data) {
    console.log('stderr:', data.toString());
  });

  proc.on('close', function(code) {
    console.log('process ended');
    console.log('status:', code);
    done(code === 0 ? null : new Error('status code:', code));
  });
};

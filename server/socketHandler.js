var queue = require('./queue');

module.exports = function(socket) {
  queue.onDockingJobCompleted(function(job, result) {
    socket.emit('jobs:docker:results', {
      jobId: job.jobId, result: result
    })
  })
}

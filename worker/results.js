var client = require('../shared/redisClient').client;

client.on("error", function (err) {
  console.log("Error " + err);
});

module.exports.addResult = function(jobId, ligandCid, score) {
  client.zadd(jobId, score, ligandCid);
};

module.exports.getResults = function(jobId, cb) {
  client.zcard(jobId, (err, progress) => {
    const total = 9523;
    client.zrange(jobId, 0, 9, 'withscores', (err, results) => {
      resultsFormatted = [];
      for (var i=0; i<results.length/2; i++) {
        resultsFormatted.push({
          ligandCid: results[2*i],
          score: results[2*i+1],
        });
      }
      cb({
        progress: progress,
        total: total,
        percent: progress / total,
        done: progress == total,
        results: resultsFormatted,
      });
    });
  });
};

const AWS = require('aws-sdk');

const s3 = new AWS.S3();

module.exports.fetch = function(key, cb) {
  const params = {
    Bucket: 'godel-chem',
    Key: key,
  };
  s3.headObject(params, function (err, metadata) {
    if (err && err.code === 'NotFound') {
      return cb(null);
    } else {
      s3.getObject(params, function(err, data) {
        if (err) { return cb(null); }
        cb(data.Body.toString());
      });
    }
  });
};

module.exports.put = function(key, data, cb) {
  const params = {
    Bucket: 'godel-chem',
    Key: key,
    Body: data,
  };
  s3.putObject(params, function (err, data) {
    cb();
  });
}

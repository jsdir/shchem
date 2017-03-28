const fs = require('fs');
const JSONStream = require('JSONStream');
const BatchStream = require('batch-stream');
const Writable = require('stream').Writable;
const inherits = require('util').inherits;
const process = require('process');

const sq = require('../server/sq');
const Compound = require('../server/models/compound');
const mapDataToCompound = require('./mapDataToCompound');

const readStream = fs.createReadStream(process.argv[2]);
const stream = JSONStream.parse('PC_Compounds.*');

const batch = new BatchStream({ size: 500 });

function DatabaseSink() {
  this.total = 0;
  Writable.call(this, {
    objectMode: true,
    // Only allow a maximum of 3 batches in the stream buffer
    highWaterMark: 3
  })
}

inherits(DatabaseSink, Writable);

DatabaseSink.prototype._write = function(data, _, cb) {
  const query = sq.queryInterface.QueryGenerator.bulkInsertQuery(
    'compounds', data.map(mapDataToCompound)
  ).slice(0, -1) + ' ON CONFLICT DO NOTHING;';

  sq.query(query).then(() => {
    this.total += data.length
    console.log(process.argv[2] + ': Total compounds uploaded: ' + this.total);
    return null;
  }).then(cb, cb);
};

readStream
  .pipe(JSONStream.parse('PC_Compounds.*'))
  .pipe(batch)
  .pipe(new DatabaseSink())
  .on('error', err => {
     console.error(err.stack);
     process.exit(1);
  });

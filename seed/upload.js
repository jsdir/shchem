const fs = require('fs');
const JSONStream = require('JSONStream');
const BatchStream = require('batch-stream');

const sq = require('../sq');
const Compound = require('../models/compound');

const readStream = fs.createReadStream(process.argv[2]);
const stream = JSONStream.parse('PC_Compounds.*');

const batch = new BatchStream({ size: 1000 });

function getRow(data) {
  return {
    cid: data.id.id.cid,
    data: JSON.stringify(data)
  };
}

var total = 0;
batch.on('data', function(data) {
  const query = sq.queryInterface.QueryGenerator.bulkInsertQuery(
    'compounds', data.map(getRow)
  ).slice(0, -1) + ' ON CONFLICT DO NOTHING;';

  sq.query(query).then(function() {
    total += data.length
    console.log(process.argv[2] + ': Total compounds uploaded: ' + total);
  }).catch(function(err) {
    throw err;
  });
});

batch.on('error', function(err) {
  throw err;
});

readStream
  .pipe(JSONStream.parse('PC_Compounds.*'))
  .pipe(batch);

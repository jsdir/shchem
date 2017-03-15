const FTPClient = require('ftp');
const zlib = require('zlib');
const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const tmp = require('tmp');
const JSONStream = require('JSONStream');

const pool = require('./pool');

function uploadMolecules(job, jsonPath, done) {
  job.log('Uploading JSON to database')

  fs.stat(jsonPath, function(err, stats) {
    if (err) return done(err);
    const size = stats.size;
    var processed = 0;

    const readStream = fs.createReadStream(jsonPath);
    const stream = JSONStream.parse('PC_Compounds.*');

    var count = 0
    readStream.on('data', function(data) {
      processed += data.length;

      if (count++ === 100) {
        count = 0
        job.progress((processed / size * 0.5) + 0.5, 1);
      }
    });

    stream.on('data', function(data) {
      pool.connect(function(err, client, clientDone) {
        if (err) return done(err);
        client.query('INSERT INTO molecules(id, data) VALUES($1, $2)', [
          data.id.id.cid,
          JSON.stringify(data)
        ], function(err) {
          clientDone(err)
          if (err) {
            done(err)
            return
          }
        })
      })
    });

    stream.on('end', function() {
      done();
    })
    stream.on('error', done)

    readStream.pipe(stream);
  })
}

function convertFile(job, asnPath, done) {
  job.log('Converting file to JSON');

  tmp.file({ prefix: 'shchem-json-' }, function(err, jsonPath, fd, cleanup) {
    if (err) return done(err);

    const proc = child_process.spawn(path.resolve(__dirname, 'datatool'), [
      '-m', path.resolve(__dirname, 'pubchem.asn'),
      '-d', asnPath,
      '-pj', jsonPath,
      '-t', 'PC-Compounds'
    ]);

    proc.on('close', code => {
      if (code !== 0) {
        return done('datatool failed with code ' + code);
      }

      job.log('Uploading to database');
      uploadMolecules(job, jsonPath, done);
    });
  });
}

function downloadFile(job, stream, size, done) {
  job.log('Downloading file');

  tmp.file({ prefix: 'shchem-asn-' }, function(err, asnPath, fd, cleanup) {
    if (err) return done(err);

    const close = err => {
      cleanup()
      done(err)
    }

    var count = 0
    stream.on('data', data => {
      if (count++ === 100) {
        count = 0
        job.progress(stream.bytesRead / size * 0.5, 1);
      }
    });

    stream.on('error', close);
    stream.on('close', convertFile.bind(null, job, asnPath, close));

    stream
      .pipe(zlib.createGunzip())
      .pipe(fs.createWriteStream(asnPath));
  });
}

module.exports = function processFile(job, done) {
  var count = 0;
  const asnFilename = job.data.file;
  const remotePath = 'pubchem/Compound/CURRENT-Full/ASN/' + asnFilename;
  console.log('Processing ' + remotePath);

  const fc = new FTPClient();
  const close = err => {
    fc.end();
    done(err);
  };

  fc.on('ready', function() {
    fc.size(remotePath, function(err, size) {
      if (err) return close(err);
      fc.get(remotePath, function(err, stream) {
        if (err) return close(err);
        downloadFile(job, stream, size, close);
      });
    });
  });

  fc.connect({ host: 'ftp.ncbi.nlm.nih.gov' });
};

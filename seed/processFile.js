const FTPClient = require('ftp');
const Xmlstream = require('xml-stream');
const zlib = require('zlib');
const path = require('path');

module.exports = function processFile(job, done) {
  var count = 0;
  const path = 'pubchem/Compound/CURRENT-Full/XML/' + job.data.file;
  console.log('processing ' + path);

  const fc = new FTPClient();
  fc.on('ready', function() {
    fc.size(path, function(err, size) {
      if (err) return done(err);
      fc.get(path, function(err, stream) {
        if (err) return done(err);
        const xml = new Xmlstream(stream.pipe(zlib.createGunzip()));
        xml.preserve('PC-Compound', true);
        xml.collect('subitem');
        xml.on('endElement: PC-Compound', function(item) {
          job.progress(stream.bytesRead / size, 1);
          count++;
          // console.log(count);
          // job.log('%i molecules', count);
          // TODO: insert item
        });
        xml.on('end', function() {
          fc.destroy();
          done();
        });
      });
    });
  });

  fc.connect({
    host: 'ftp.ncbi.nlm.nih.gov'
  });
};

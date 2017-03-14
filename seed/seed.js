const fs = require('fs');
const FTPClient = require('ftp');
const Xmlstream = require('xml-stream');
const zlib = require('zlib');
const eachLimit = require('async/eachLimit');
const path = require('path');

const files = fs.readFileSync(
  path.resolve(__dirname, 'compound_files.txt')
).toString().split('\n');

var count = 0;
const fc = new FTPClient();
fc.on('ready', function() {
  // This runs only one downloader in parallel for now
  eachLimit(files, 1, function(file, cb) {
    const path = 'pubchem/Compound/CURRENT-Full/XML/' + file;
    console.log('loading molecules from ' + path);
    fc.get(path, function(err, stream) {
      if (err) throw err;
      const xml = new Xmlstream(stream.pipe(zlib.createGunzip()));
      xml.preserve('PC-Compound', true);
      xml.collect('subitem');
      xml.on('endElement: PC-Compound', function(item) {
        count++;
        console.log(count);
        // TODO: insert item
      });
      xml.on('end', cb);
    });
  }, function() {
    fc.destroy();
  });
});

fc.connect({
  host: 'ftp.ncbi.nlm.nih.gov'
});

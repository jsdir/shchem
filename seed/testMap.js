// Usage: node testMap.js <cid>
//
// Example: node testMap.js 1650002

const https = require('https');

const mapDataToCompound = require('./mapDataToCompound');

const cid = process.argv[2];
const url = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/' + cid + '/record/JSON/';

console.log('Loading from:');
console.log(url);

https.get(url, function(res) {
  var body = '';

  res.on('data', function(chunk) {
    body += chunk;
  });

  res.on('end', function() {
    const data = JSON.parse(body);
    console.log(mapDataToCompound(data.PC_Compounds[0]));
  });
});

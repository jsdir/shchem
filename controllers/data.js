const request = require("request");
const fs = require('fs');
const Xmlstream = require('xml-stream');

 
module.exports.molecules = function(req, res){
  var stream = fs.createReadStream('./Library1.xml');
  var xml = new Xmlstream(stream);
  var bigList = [];
  var count = 0;
  xml.preserve('PC-Compound', true);
  xml.collect('subitem');
  xml.on('endElement: PC-Compound', function(item) {
    //  bigList.push(item);
    count++;
    if (count % 1000 == 0) {
      console.log(count);
    }
    // console.log('added one! new count is: ', bigList.length);
  });
}

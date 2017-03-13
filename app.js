var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var molecules = require('./controllers/data');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();

const request = require("request");
const fs = require('fs');
const Xmlstream = require('xml-stream');

var stream = fs.createReadStream('./Library1.xml');
var xml = new Xmlstream(stream);
var bigList = [];
var count = 0;

xml.preserve('PC-Compound', true);
xml.collect('subitem');
console.log('starting');

xml.on('endElement: PC-Compound', function(item) {
  //  bigList.push(item);
  count++;
  if (count % 100 == 0) {
    console.log(count);
  }
  // console.log('added one! new count is: ', bigList.length);
  });

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
 res.locals.message = err.message;
 res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

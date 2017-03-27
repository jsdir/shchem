var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var paginate = require('express-paginate');

var api_v1 = require('./routes/api/v1');
var index = require('./routes/index');

var app = express();

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (['production', 'test'].indexOf(process.env.NODE_ENV) === -1) {
  const toureiro = require('toureiro');
  app.use('/job-queue', toureiro());

  const Webpack = require('webpack');
  const WebpackConfig = require('../webpack.config.js');
  const WebpackDevMiddleware = require('webpack-dev-middleware');

  app.use(WebpackDevMiddleware(Webpack(WebpackConfig), { noinfo: true }));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(paginate.middleware(10, 100)); // (default limit, max limit)

app.use('/api/v1', api_v1);
app.use('*', index);

app.use(function(err, req, res, next) {
 res.locals.message = err.message;
 res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

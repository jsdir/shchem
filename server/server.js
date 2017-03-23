var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var paginate = require('express-paginate');

var api_v1 = require('./routes/api/v1');
var index = require('./routes/index');
var users = require('./routes/users');
var compounds = require('./routes/compounds');

var app = express();

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
  const Webpack = require('webpack');
  const WebpackConfig = require('../webpack.config.js');
  const WebpackDevMiddleware = require('webpack-dev-middleware');

  app.use(WebpackDevMiddleware(Webpack(WebpackConfig), { noinfo: true }));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(paginate.middleware(10, 100)); // (default limit, max limit)

app.use('/api/v1', api_v1);
app.use('/users', users);
app.use('/compounds', compounds);
app.use('*', index);

// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.use(function(err, req, res, next) {
 res.locals.message = err.message;
 res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

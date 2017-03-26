const path = require('path');

module.exports = {
  name: 'client',
  context: __dirname + '/client',
  entry: [
    './app.jsx'
  ],
  output: {
    path: __dirname + '/server/public',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader']
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};

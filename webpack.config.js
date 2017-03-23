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
      use: [{
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};

module.exports = {
  name: 'client',
  context: __dirname + '/client',
  entry: [
    './app.jsx'
  ],
  output: {
    path: __dirname + '/server/bundle',
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
 };

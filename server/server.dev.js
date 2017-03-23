const server = require('./server.js');

const Webpack = require('webpack');
const WebpackConfig = require('../webpack.config.js');
const WebpackDevMiddleware = require('webpack-dev-middleware');

const port = 3000

server.use(WebpackDevMiddleware(Webpack(WebpackConfig), { noinfo: true }));
console.log('listening on http://localhost:' + port)
server.listen(port);

const server = require('./server');

const port = process.env.PORT || 3000
console.log('listening on http://localhost:' + port)
var io = require('socket.io')(server.listen(port));
io.on('connection', require('./socketHandler'));

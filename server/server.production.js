const path = require('path');
const express = require('express');

const server = require('./server.js');

const port = process.env.PORT || 3000

server.use(express.static(path.resolve(__dirname, 'bundle')));
console.log('listening on port ' + port)
server.listen(port);

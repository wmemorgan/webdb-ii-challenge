const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/', (req, res) => {
  res.send(`<h1>Welcome to my Web DB II API server</h1>`)
})

module.exports = server
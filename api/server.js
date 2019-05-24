const express = require('express');
const helmet = require('helmet');

// Import routes
const zoosRouter = require('../zoos/zoos-router')

// Instantiate server
const server = express();

// Load middleware
server.use(express.json());
server.use(helmet());

// Routes
server.use('/api/zoos', zoosRouter)
server.use('/', (req, res) => {
  res.send(`<h1>Welcome to my Zoos API server</h1>`)
})

module.exports = server
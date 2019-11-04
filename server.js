const express = require('express');

const actRoute= require('./router/accountRoute');

const server = express();

server.use(express.json());

server.use('/api/accounts', actRoute);


module.exports = server;
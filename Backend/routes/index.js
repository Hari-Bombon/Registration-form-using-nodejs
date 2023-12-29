const authRoute = require('./auth.route.js');
const express = require('express');
const app = express(); 

app.use('/', function(req, res) {
  res.send({
    message: 'Our first endpoint',
  });
});

app.use('/auth', authRoute);

module.exports = app;


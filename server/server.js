// require('./initializeDB.js')();
var express = require('express');
var url = require('url');
var path = require('path');
var server = express();
var dbHelpers = require('./dbHelpers.js');

server.configure(function(){
  server.use(express.static('client'));
});

server.get('/', function (req, res) {
  res.sendfile(url.resolve(__dirname, './client/index.html'));
});

server.listen(3000);
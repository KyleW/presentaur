var express = require('express');
var url = require('url');
var server = express();



server.get('/', function (req, res) {
  console.log(req.route)
  res.sendfile(url.resolve(__dirname, './client/index.html'));
});

server.listen(3000);
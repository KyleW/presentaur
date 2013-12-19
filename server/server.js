var app = require('express')()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function (req, res) {
  console.log(req.route)
  res.sendfile(__dirname + '../index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
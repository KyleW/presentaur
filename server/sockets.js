

var server = require('./server.js').server;
var io = require('socket.io').listen(server);


io.set('log level', 0);

//Socket connections
io.sockets.on('connection', function (socket) {

  socket.on('dj join', function(room){
    socket.set('room', room);
    socket.join(room);
  });

  socket.on('presentation join', function(room){
    socket.set('room', room);
    socket.join(room);
  });

  socket.on('fade out', function(){
    socket.get('room', function(err, room){
      io.sockets.in(room).emit('fade out');
    });
  });

  socket.on('fade in', function(){
    socket.get('room', function(err, room){
      io.sockets.in(room).emit('fade in');
    });
  });
  socket.on('fullscreen', function(){
    socket.get('room', function(err, room){
      io.sockets.in(room).emit('fullscreen');
    });
  });
  socket.on('begin', function(){
    socket.get('room', function(err, room){
      io.sockets.in(room).emit('begin');
    });
  });
  socket.on('start over', function(){
    socket.get('room', function(err, room){
      io.sockets.in(room).emit('start over');
    });
  });
});
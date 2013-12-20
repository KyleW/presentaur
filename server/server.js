var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var url = require('url');
var path = require('path');

var route = require('./router.js')

server.listen(3000);

app.configure(function(){
  app.use(express.static('client'));
});


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


app.get('/', function (req, res) {
  res.sendfile(url.resolve(__dirname, './client/index.html'));
});

app.post('/meeting/new', function(req, res){
  db.updateMeeting();
  res.sendMeeting(db.requestMeeting());
})

app.get('/meeting/:id', function(req, res){
  res.send()//meeting info)
});

app.post('/user/new', function(req,res){

});

app.get('user/:id', function(req, res){

});




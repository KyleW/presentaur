// require('./initializeDB.js')();
var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var url = require('url');
var path = require('path');
var dbHelpers = require('./dbHelpers.js');

var route = require('./router.js');

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


// Static files
app.get('/', function (req, res) {
  res.sendfile(url.resolve(__dirname, './client/index.html'));
});


// Meetings
app.post('/meeting/new', function(req, res){
  // FIXME: changes needed
  // 1. needs to grab name of meeting from req and insert into function
 
  var newId = dbHelpers.createMeeting("Test3");  //createMeeting returns new meetings ID
  // res.sendMeeting(db.requestMeeting());
});

app.get('/meeting/:id', function(req, res){
  console.log("recieved get request");
  var test = dbHelpers.getMeeting(1);
  console.log(test);
  // res.send();//meeting info)
});


// Users
app.post('/user/new', function(req,res){

});

app.get('user/:id', function(req, res){

});




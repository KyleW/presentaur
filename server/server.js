
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var url = require('url');
var path = require('path');
var io = require('socket.io').listen(server);
require('../newrelic');

// Server and DB helpers
if(!process.env.DEPLOYED) {var Config = require('./config.js');}
var dbHelpers = require('./dbHelpers.js');
var meeting = require('./meetingHelpers.js');
var user = require('./userHelpers.js');
var passport = require('passport');
require ('./auth.js');
require('./sockets.js');


module.exports.server = server;

var port = process.env.PORT || 3000;
server.listen(port,function () {
  console.log('Buzzing along on ' + port);
});

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.static('client'));

  // Auth
  app.use(express.cookieParser());
  app.use(express.session({ secret: process.env.SESSION_SECRET || Config.SESSION_SECRET }));
  app.use(passport.initialize());
  app.use(passport.session());
});


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




// Static files
app.get('/', function (req, res) {
  res.sendfile(url.resolve(__dirname, './client/index.html'));
});

app.get('/favicon.ico', function (req, res) {
  res.sendfile(url.resolve(__dirname, '/favicon.ico'));
});


// Meetings
app.post('/meeting/new', meeting.create);
app.get('/meeting/:id', meeting.get);
app.get('/meeting/owner/:id', meeting.findByOwner);
app.get('/meeting/speaker/:id', meeting.findBySpeaker);
app.delete('/meeting/:id', meeting.remove);


// Auth
app.get('/user/:id', user.get);

// Google
app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email']
}));

app.get('/auth/google/return',
  passport.authenticate('google', {failureRedirect: '/' }),
  function(req, res) {
    res.redirect('#/dashboard/'+req.user._id);
});


// LinkedIn
app.get('/auth/linkedin',passport.authenticate('linkedin',{ scope: ['r_basicprofile', 'r_emailaddress']}));
app.get('/auth/linkedin/return',
  passport.authenticate('linkedin', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('#/dashboard/'+req.user._id);
});

// Logout
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

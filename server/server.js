module.exports = function(){
  var express = require('express');
  var app = require('express')();
  var server = require('http').createServer(app);
  var io = require('socket.io').listen(server);
  var url = require('url');
  var path = require('path');

  // Server and DB helpers
  var dbHelpers = require('./dbHelpers.js');
  var meeting = require('./meetingHelpers.js');
  var user = require('./userHelpers.js');
  // var presentation = require('./presentationHelpers.js');
  // var route = require('./router.js');
  // var flash = require('connect-flash');


  // Auth modules
  var passport = require('passport');
  var auth = require ('./auth.js');


  server.listen(process.env.PORT || 3000);

  app.configure(function(){
    app.use(express.bodyParser());
    app.use(express.static('client'));

    // Auth
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());
  });

  //Socket connections
  io.sockets.on('connection', function (socket) {

    console.log('socket connected ' + socket);

    socket.on('dj join', function(room){
      socket.set('room', room);
      console.log('dj is connected to room: ' + room);
      socket.join(room);
    });

    socket.on('presentation join', function(room){
      socket.set('room', room);
      console.log('presentation is connected to room: ' + room);
      socket.join(room);
    });

    socket.on('fade out', function(){
      socket.get('room', function(err, room){
        io.sockets.in(room).emit('fade out');
        console.log('fade out was called for clients in room: ' + room);
      });
    });

    socket.on('fade in', function(){
      socket.get('room', function(err, room){
        io.sockets.in(room).emit('fade in');
        console.log('fade in was called for clients in room: ' + room);
      });
    });
    socket.on('fullscreen', function(){
      socket.get('room', function(err, room){
        io.sockets.in(room).emit('fullscreen');
        console.log('fullscreen was called for clients in room: ' + room);
      });
    });
    socket.on('start over', function(){
      socket.get('room', function(err, room){
        io.sockets.in(room).emit('start over');
        console.log('start over was called for clients in room: ' + room);
      });
    });
  });


  // Static files
  app.get('/', function (req, res) {
    res.sendfile(url.resolve(__dirname, './client/index.html'));
  });


  // Meetings
  app.post('/meeting/new', meeting.create);
  app.get('/meeting/:id', meeting.get);
  app.get('/meeting/owner/:id', meeting.findByOwner);
  app.get('/meeting/speaker/:id', meeting.findBySpeaker);

  // Presentations
  // app.get('/presentation/:id', presentation.connect);


  // Auth
  app.get('/user/:id', user.get);

  // local
  app.post('/newUser', user.create);
  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('#/dashboard/'+req.user._id);
  });

  // Google
  app.get('/auth/google', passport.authenticate('google'));
  app.get('/auth/google/return',
    passport.authenticate('google', {failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('#/dashboard/'+req.user._id);
  });

  // LinkedIn
  app.get('/auth/linkedin',passport.authenticate('linkedin',{ scope: ['r_basicprofile', 'r_emailaddress']}));
  app.get('/auth/linkedin/return',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('#/dashboard/'+req.user._id);
  });

  // Logout
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

};
module.exports = function(){
var express = require('express');
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var url = require('url');
var path = require('path');

// Server and DB helpers
var dbHelpers = require('./dbHelpers.js');
var meeting = require('./meetingHelpers');
var user = require('./userHelpers');
var presentation = require('./presentationHelpers');
var route = require('./router.js');
var flash = require('connect-flash');


// Auth modules
var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var auth = require ('./auth.js');


server.listen(process.env.PORT || 3000);

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.static('client'));
});

//Socket connections
io.sockets.on('connection', function (socket) {
  socket.on('fade out', function(){
    io.sockets.emit('fade out');
  });
  socket.on('fade in', function(){
    io.sockets.emit('fade in');
  });
  socket.on('fullscreen', function(){
    io.sockets.emit('fullscreen');
  });
});


// Static files
app.get('/', function (req, res) {
  res.sendfile(url.resolve(__dirname, './client/index.html'));
});


// Meetings
app.post('/meeting/new', meeting.create);

app.get('/meeting/:id', meeting.get);


// Users
app.post('/user/new', user.create);

app.get('user/:id', user.get);

// Presentations
// app.get('/presentation/:id', presentation.connect);

app.post('/login',passport.authenticate('local',
  {
    successFlash: 'Welcome!',
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));



// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//     /auth/google/return
app.get('/auth/google', passport.authenticate('google'));

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/return',
  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login' }));
}

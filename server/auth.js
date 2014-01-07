
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var User = require('./userHelpers.js');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (password !== user.password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


passport.use(new GoogleStrategy({
    returnURL: 'http://presentaur.herokuapp.com/auth/google/return',
    realm: 'http://presentaur.herokuapp.com'
  },
  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier, profile: profile }, function(err, user) {
      done(err, user);
    });
  }
));


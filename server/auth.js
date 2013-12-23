var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;


passport.use(new GoogleStrategy({
    returnURL: 'http://www.example.com/auth/google/return',
    realm: 'http://presentaur.herokuapp.com/'
  },
  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));



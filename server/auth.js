var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;


passport.use(new GoogleStrategy({
    returnURL: 'http://presentaur.herokuapp.com/auth/google/return',
    realm: 'http://presentaur.herokuapp.com/'
  },
  function(identifier, profile, done) {
    //Use identifier to find or create the user
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });

    //grab what we want from profile and store it
  }
));



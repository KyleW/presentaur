
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var GoogleStrategy = require('passport-google').Strategy; // openID 2.0
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; //OAuth 2.0
var LinkedInStrategy = require('passport-linkedin').Strategy;

var User = require('./userHelpers.js');
var Config = require('./config.js');

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

// Google OpenId 
// passport.use(new GoogleStrategy({
//     returnURL: 'http://localhost:5000/auth/google/return',
//     realm: 'http://localhost:5000'
//     // returnURL: 'http://presentaur.herokuapp.com/auth/google/return',
//     // realm: 'http://presentaur.herokuapp.com'
//   },
//   function(identifier, profile, done) {
//     console.log("google profile");
//     console.log(profile);
//     // console.log("google profile");
//     // console.log(profile);
//     var newUser = {
//       displayName: profile.displayName,
//       name: profile.name,
//       email: profile.emails[0].value.toLowerCase(),
//       headline: null,
//       pictureUrl: null
//     };
//     User.findOrCreate(newUser, function(err, user) {
//       return done(err, user);
//     });
//   }
// ));

// Google OAuth 2.0

passport.use(new GoogleStrategy({
    clientID: Config.GOOGLE_CLIENTID,
    clientSecret: Config.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/return"
    // callbackURL: "http://presentaur.herokuapp.com/auth/google/return"

  },
  function(accessToken, refreshToken, profile, done) {
    var newUser = {
      displayName: profile.displayName,
      name: profile.name,
      email: profile.emails[0].value.toLowerCase(),
      headline: null,
      pictureUrl: profile._json.picture
    };
    User.findOrCreate(newUser, function(err, user) {
      return done(err, user);
    });
  }
));



passport.use(new LinkedInStrategy({
    consumerKey: Config.LINKEDIN_API_KEY,
    consumerSecret: Config.LINKEDIN_SECRET_KEY,
    callbackURL: "http://localhost:5000/auth/linkedin/return",
    // callbackURL: "http://presentaur.herokuapp.com/auth/linkedin/return",
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline','picture-url']
  },
  function(token, tokenSecret, profile, done) {
    var newUser = {
      displayName: profile.displayName,
      name: profile.name,
      email: profile.emails[0].value.toLowerCase(),
      headline: profile._json.headline,
      pictureUrl: profile._json.pictureUrl
    };
    User.findOrCreate(newUser, function (err, user) {
      return done(err, user);
    });
  }
));

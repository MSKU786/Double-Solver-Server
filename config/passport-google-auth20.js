const passport = require('passport');
const crypto = require('crypto');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: "363086331701-j72med5b4r7l2ed4059lhohudv4ggp9i.apps.googleusercontent.com",
    clientSecret: "2O8Vm8WQXPLg4PdI6xONj9Ie",
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ email: profile.email[0].value }).exec(function (err, user) {
      if(err){
          console.log('error in google-strategy-passport',err);
          return;
      }
      console.log(profile);
      if(user){
          return done(null, user);
      }else{
          User.create({
              username: profile.displayName,
              email: profile.email[0].value,
              password: crypto.randomBytes(15).toString('hex')
          }, function(err,user){
                if(err){
                    console.log('error in CREATING- google-strategy-passport',err);
                    return;
                }
                return done(null, user);
          })
      }

    });
  }
));
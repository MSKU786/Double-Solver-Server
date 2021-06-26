// require express
const express = require('express');
//const postRoute = require('./routes/post');

// initialize app
const app = express();
// require routes handler from routes folder

const authRoute = require('./routes/auth');
const doubtRoute = require('./routes/doubt');
const commentRoute = require('./routes/comment');
const passport = require("passport");
const googleAuth = require("passport-google-oauth20").Strategy;  
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Accessing environment variable
require('dotenv').config()
const cors = require("cors")

// give port number. 8000 is for development and env.PORT is for deployment.
const PORT = process.env.PORT || 8000;

//Data extracted
const db = require('./config/mongoose');

app.use(passport.initialize());
//Passport config
require("./config/passport")(passport);
passport.use(new GoogleStrategy({
    clientID: "363086331701-j72med5b4r7l2ed4059lhohudv4ggp9i.apps.googleusercontent.com",
    clientSecret: "2O8Vm8WQXPLg4PdI6xONj9Ie",
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
app.use(express.json());

app.use(cors());
//call the route
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
app.use("/api/auth", authRoute);
app.use("/api/doubt",passport.authenticate('jwt', { session: false }),  doubtRoute);
app.use("/api/comment", passport.authenticate('jwt', { session: false }), commentRoute);

//Serve static assests if in production
if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'))
}

// make the app listen on the correct port and give a message on successful start
app.listen(PORT, function (err) {
    if(err){
        console.log(err);
        return;
    }
    console.log(`Server is up and running on port: ${PORT}`);
});
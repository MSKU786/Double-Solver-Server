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

app.use(express.json());

app.use(cors());



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
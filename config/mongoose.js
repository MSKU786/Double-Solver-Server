// require mongoose
const mongoose = require('mongoose');

require('dotenv').config();

// acquire connection

mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   

const db = mongoose.connection;

// if error occurs print the error
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// on successfull connection print success message
db.once('open', function () {
    console.log('Connected to Database :: MongoDB');
});

// export config to use in index.js
module.exports = db;
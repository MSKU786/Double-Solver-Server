// require mongoose
const mongoose = require('mongoose');

// create a schema for user
const doubtSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        min: 6,
        required: true
    },
    desc: {
        type: String,
        required: true,
        min: 10
    },
    comments: {
        type: [],
    },

    answer: {
        type: userId,
    },
    isAnswer:{
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });

// the following code will execute right before we save

// create model with the schema
const Doubt = mongoose.model('Doubt', doubtSchema);

// export model
module.exports = Doubt;
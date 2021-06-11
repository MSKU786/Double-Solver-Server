// require mongoose
const mongoose = require('mongoose');

// create a schema for user
const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
        min: 10
    },
    isAnswer:{
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });

// the following code will execute right before we save

// create model with the schema
const Comment = mongoose.model('Comment', commentSchema);

// export model
module.exports = Comment;
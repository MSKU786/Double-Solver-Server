const Comment = require( "../models/comments");
const Doubt = require("../models/doubt");
const User = require("../models/user");
module.exports.updateAnswer = async(req,res) => {
    try{
        console.log("Updatin Nsdkfjal;ksjdf");
        
        res.status(200).json(user);
    }catch(err)
    {
        res.status(500).json(err);
    }
}

module.exports.create = async(req,res) =>  {
    
    const newComment = new Comment({
        userId: req.body.userId,
        desc: req.body.desc,
        isAnswer: req.body.isAnswer,
    });

    try{
        const comment = await newComment.save();
        const pushComment = await Doubt.findById(req.params.id);
        console.log(newComment);
        if(req.body.isAnswer)
        {

            await pushComment.updateOne({ $set:{ answer:newComment._id }});
            const user = await User.findById(req.body.userId);
            await user.updateOne({ $push:{answerTime:req.body.time}});
        }
        else
        {
            await pushComment.updateOne({ $push:{ comments:newComment._id }});
        }
        
        res.status(200).json(comment);
    }catch(err){
        console.log(err);
    }
}


module.exports.delete = async(req, res) => {
    try{
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId);
        if(comment.userId === req.body.userId)
        {
            await comment.deleteOne();
            res.status(200).json("Post Has been deleted");
        }
        else{
            res.status(403).json("You can only delete your post");
        }
    }catch(err)
    {
        res.status(400).json(err);
    }
}

module.exports.get = async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.id);
        res.status(200).json(comment);
    }catch(err)
    {
        res.status(400).json(err);
    }
}
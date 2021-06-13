const Doubt = require( "../models/doubt");
const User = require("../models/user");
module.exports.create = async(req,res) =>  {
    console.log(req.body);
    const newDoubt = new Doubt(req.body);

    try{
        const comment = await newDoubt.save();
        console.log(comment);
        res.status(200).json(comment);
    }catch(err){
        res.status(500).json(err);
    }
}


module.exports.delete = async(req, res) => {
    try{
        const doubtId = req.params.id;
        const doubt = await Doubt.findById(doubtId);
        if(doubt.userId === req.body.userId)
        {
            await Doubt.deleteOne();
            res.status(200).json("Doubt Has been deleted");
        }
        else{
            res.status(403).json("You can only delete your post");
        }
    }catch(err)
    {
        res.status(500).json(err);
    }
}

module.exports.get = async (req, res) => {
    try{
        const doubt = await Doubt.findById(req.params.id);
        res.status(200).json(doubt);
    }catch(err)
    {
        res.status(400).json(err);
    }
}


module.exports.getAll = async(req, res) => {
    try{
        const doubts = await Doubt.find({});
       
        const doubtList = [];
        doubts.map((friend) => {
            doubtList.push( friend );
        });
        res.status(200).json(doubtList);
    }
    catch(err){
        res.status(500).json(err);
    }
}

module.exports.getRemaining = async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const doubts = await Doubt.find({});
        const doubtList = [];
        doubts.map((friend) => {
            if(friend.id in user.escalated)
                {

                }
            else
                doubtList.push( friend );
        });
        res.status(200).json(doubtList);
    }
    catch(err){
        res.status(500).json(err);
    }
}

module.exports.accepted = async(req,res) => {
    try{
        console.log(req.body);
        const user = await User.findById(req.params.id);
        await user.updateOne({ $push:{accepted:req.body.id}});
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports.escalated = async(req,res) => {
    try{
        console.log(req.body);
        const user = await User.findById(req.params.id);
        await user.updateOne({ $push:{escalated:req.body.id}});
    }catch(err){
        res.status(500).json(err);
    }
}
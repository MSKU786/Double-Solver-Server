const Doubt = require( "../models/doubt");

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
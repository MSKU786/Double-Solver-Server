const Post = require( "../models/posts");

module.exports.create = async(req,res) =>  {
    console.log(req.body);
    const newPost = new Post({
        userId: req.body.userId,
    });

    try{
        const post = await newPost.save();
        res.status(200).json(post);
    }catch(err){
        console.log(err);
    }
}


module.exports.delete = async(req, res) => {
    try{
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(post.userId === req.body.userId)
        {
            await post.deleteOne();
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
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err)
    {
        res.status(400).json(err);
    }
}
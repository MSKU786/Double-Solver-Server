const User = require( "../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
//const passport = require("passport");
require('dotenv').config()

module.exports.register = async (req,res) =>  {
    console.log(req.body);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        usertype: req.body.usertype
    });

    try{
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        console.log(err);
    }
}


//Login user
module.exports.login = async(req, res) => {
    try{
        //console.log(req.body);
        console.log("*****************************");
        console.log(req.isAuthenticated());
        console.log(req);
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("User not found");
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword)
            res.status(404).json("Wrong password");
        
        const payload = {
            id: user._id,
            name: user.username,
        };
    
        // Sign token
        jwt.sign(
        payload,
        process.env.secretKey,
        {
            expiresIn: 9155690, // 1 year in seconds
        },
        (err, token) => {
            res.status(200).json({
            success: true,
            token:  token,
            user,
            });
        }
        );
       // res.status(200).json(user);
    }
    catch(err){
        console.log(err);
    }
}

//Delete User
module.exports.delete =  async (req, res) =>{
    if(req.body.userId === req.params.id ){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account Deleted");
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        return res.status(403).json("You can delete only your account!");
    }
}


//get a user
module.exports.get = async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      console.log(other);
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  }

//module.exports.
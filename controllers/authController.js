const User = require( "../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
//const passport = require("passport");
var crypto = require('crypto');

//const passport = require("passport");



require('dotenv').config()

const client = new OAuth2Client("363086331701-j72med5b4r7l2ed4059lhohudv4ggp9i.apps.googleusercontent.com");

//Register user

module.exports.register = async (req,res) =>  {
    //console.log(req.body);
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
            expiresIn: 3600000, // 1 hour in mili seconds
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
        res.status(500).json(err);
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

module.exports.googleLogin = async(req, res) => {
    const {tokenId} = req.body;
    try{
        const response = await client.verifyIdToken({idToken:tokenId, audience: "363086331701-j72med5b4r7l2ed4059lhohudv4ggp9i.apps.googleusercontent.com"});
        const {email_verified,name, email} = response.payload;
        if(email_verified) {
            const user = await User.findOne({ email: email });
            if(user)
            {
                    const payload = {
                        id: user._id,
                        name: user.name,
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
            }
            else{
                  console.log("inside creationg user");
                  const user = User.create({
                      username: name,
                      email: email,
                      password: crypto.randomBytes(15).toString('hex')
                  });
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
            }
        }
    }catch(err){
        console.log(err);
    }
}

module.exports.onlyTA = async(req,res) => {
    try{
        const user = await User.find({});
        const users = [];
        user.map((u) => {
            if(u.usertype === ("TA"))
            {
                const { password, updatedAt, ...other } = u._doc;
                //console.log(other);
                users.push( other);
            }
            
        });
        res.status(200).json(users);
    }catch(err)
    {
        res.status(500).json(err);
    }
}

//Get a user
module.exports.get = async (req, res) => {
    try{
        console.log(req.params.id);
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        //console.log(other);
        res.status(200).json(other);
    }catch(err)
    {
        res.status(400).json(err);
    }
}

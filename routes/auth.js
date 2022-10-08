const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        isAdmin: req.body.isAdmin
    });

    try{
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    }
    catch(err) {
        const usernameExists = await User.findOne({ username: new RegExp('^'+req.body.username+'$')});
        const emailExists = await User.findOne({ email: new RegExp('^'+req.body.email+'$')});

        if(usernameExists){
            res.status(500).json("Username Alrady Exists, Try Different One");
        }
        else if(emailExists){
            res.status(500).json("Email Alrady Exists, Try Different One");
        }
        else{
            res.status(500).json(err);
        }
    }
})

//LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
         
        if(user){
            const hashedpassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC
            );
            const OriginalPassword = hashedpassword.toString(CryptoJS.enc.Utf8);
    
            if(OriginalPassword === req.body.password){
                const accessToken = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin,
                }, 
                process.env.JWT_SEC)
                {expiration: "3h"}

                const {password, ...others} = user._doc;
                res.status(200).json({...others, accessToken});
                
            } else{
                res.status(401).json("Wrong Password!");
            }    
    
        } else{
            res.status(401).json("Wrong Credentials!");
        }
        }catch (err) {
            res.status(500).json(err);
        }
       
})

module.exports = router;
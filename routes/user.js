const router = require("express").Router();
const { findOneAndUpdate } = require("../models/User");
const User = require("../models/User");
const {verifyToken, verifyTokenAndAuthorizarion, verifyTokenAndAdmin} = require("./verifyToken");

//GET SPECIFIC USER
router.get("/find/:username", verifyTokenAndAdmin, async(req, res) => {
    const userName = req.params.username;

        try {
        const user = await User.findOne({ username: new RegExp('^'+userName+'$')});
        console.log(user);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err)
    }
});

//GET ALL USER
router.get("/find_all", verifyTokenAndAdmin, async (req, res) => {

    try {
      const users = await User.find({ isAdmin: false });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //MAKE ADMIN
router.put("/admin/make", verifyTokenAndAdmin, async(req, res) => {
  const recivedUser = req.body.userName;
  try {
    let user = await User.findOne({ username: new RegExp('^'+recivedUser+'$')});
    if(!user) {
      res.status(500).json("User not found")
    }
 
    const result = await user.updateOne({ isAdmin: true });
      res.status(200).json("Maiden Admin Successfully");
  } catch (err) {
      res.status(500).json(err)
  }
});
  
module.exports = router;
const Cart = require("../models/Cart");
const {verifyToken, verifyTokenAndAuthorizarion, verifyTokenAndAdmin} = require("./verifyToken");
const router = require("express").Router();

//CREATE
router.post("/add", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/delete/:cartId", verifyTokenAndAuthorizarion, async(req, res) => {
    // cartId is mongo objectId of the cart....
    try {
        await Cart.deleteOne({ _id: req.params.cartId })
        res.status(200).json("Product of cart has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
});

//CLEAR CART
router.delete("/clear/:user_name", verifyTokenAndAuthorizarion, async(req, res) => {
    const userName = req.params.user_name
    try {
        await Cart.deleteMany({ username: userName })
        res.status(200).json("cart has been cleared...")
    } catch (err) {
        res.status(500).json(err)
    }
});

//GET A USERS CART
router.get("/find/:userName", verifyTokenAndAuthorizarion, async(req, res) => {
    try {
        const cart = await Cart.find({ username: req.params.userName});
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;
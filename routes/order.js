const Order = require("../models/Order");
const {verifyToken, verifyTokenAndAuthorizarion, verifyTokenAndAdmin} = require("./verifyToken");
const router = require("express").Router();

//CREATE ORDER

router.post("/add", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }

});


//DELETE ORDER
router.delete("/clear/:orderId", verifyTokenAndAuthorizarion, async(req, res) => {
    const orderID = req.params.orderId;
    try {
        await Order.deleteOne({ _id: orderID })
        res.status(200).json("Order has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
});

//UPDATE ORDER
router.put("/update/:orderId", verifyTokenAndAuthorizarion, async(req, res) => {
    const orderID = req.params.orderId;
    try {
        await Order.findByIdAndUpdate(orderID, { status: req.body.Status})
        res.status(200).json("Updated Successfully");
    } catch (err) {
        res.status(500).json(err)
    }
});

//GET USERS ORDER
router.get("/find/:userName", verifyTokenAndAuthorizarion, async(req, res) => {
    const UserName = req.params.userName;
    try {
        const orders = await Order.find({ username: UserName});
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err)
    }
});

//GET ALL
router.get("/find_all", verifyTokenAndAdmin, async(req, res) => {
    try {
        const orders= await Order.find();
       
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;
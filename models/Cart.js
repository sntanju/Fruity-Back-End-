const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        productname: { type: String, required: true },
        weight: { type: String, required: true },
        img: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1, }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
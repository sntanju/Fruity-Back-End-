const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        username: { type: String, required: true},
        elements: [ {} ],
        address: { type: String, required: true },
        phone: { type: String, required: true },
        amount: { type: Number, required: true },
        status: { type: String, default: "Pending" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
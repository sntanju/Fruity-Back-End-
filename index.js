const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {dbName: "Fruity"})
.then(() => console.log("DBConnection successful"))
.catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);
app.use("/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend is running");
})


// mongoose DatabaseName setting: mongoose.connect(process.env.MONGO_URL, {dbName: "your DB name"}) 
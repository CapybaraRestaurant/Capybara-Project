const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    name: String,
    price: Number
})
const orderSchema = new mongoose.Schema({
    id: Number,
    customer: String,
    time: Date,
    address: String,
    telNo: String,
    items: [ menuSchema ],
    totalPrice: Number,
    status: String
});

exports.Menu = mongoose.model("menu", menuSchema);
exports.Order = mongoose.model("order", orderSchema);
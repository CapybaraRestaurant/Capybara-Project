const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    name: String,
    price: Number
})
const orderSchema = new mongoose.Schema({
    customer: String,
    time: Date,
    address: String,
    telNo: String,
    items: [ menuSchema ],
    totalPrice: Number
});
const orderListSchema = new mongoose.Schema({
    id: Number,
    order: [ orderSchema ]
});

exports.Menu = mongoose.model("menu", menuSchema);
exports.Order = mongoose.model("order", orderSchema);
exports.List = mongoose.model("list", orderListSchema);
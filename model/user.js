const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

exports.User = mongoose.model("user", userSchema);
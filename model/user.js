const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user: String,
    password: String
});

exports.User = mongoose.model("user", userSchema);
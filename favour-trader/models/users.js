var mongoose = require("mongoose");

var user = new mongoose.Schema({
   name: String,
});

module.exports = mongoose.model("User", user);
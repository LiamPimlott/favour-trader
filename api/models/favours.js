var mongoose = require("mongoose");


var favourSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

module.exports = mongoose.model("Favour", favourSchema);
var mongoose = require("mongoose");

// Simple mongoose schema example
var favourSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

module.exports = mongoose.model("Favour", favourSchema);
const mongoose = require("mongoose");

var skillSchema = new mongoose.Schema({
    skill: String,
});

module.exports = mongoose.model("Skill", skillSchema);
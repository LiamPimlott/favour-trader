var mongoose = require("mongoose");
const userRef = {
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
};

var favor = new mongoose.Schema({
    terms: String,
    promisor: userRef,
    promisee: userRef,
    completed: boolean
});

module.exports = mongoose.model("Favor", favor);
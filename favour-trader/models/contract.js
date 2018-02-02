var mongoose = require("mongoose");
const userRef = {
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
};

var contractSchema = new mongoose.Schema({
    parties: [ userRef ],
    favors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favor'
    }],
    lastOfferBy: String,
    offerStatus: String
});

module.exports = mongoose.model("Contract", contractSchema);
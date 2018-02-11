var mongoose = require("mongoose");

var FavourSchema = new mongoose.Schema({
    terms: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
});

var ContractSchema = new mongoose.Schema({
    offeror: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        favours: [ FavourSchema ],
        requestTermination: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    offeree: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: 'User'
        },
        favours: [ FavourSchema ],
        requestTermination: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Declined'],
        required: true,
        default: 'Pending'
    }
});

module.exports = mongoose.model("Contract", ContractSchema);
var mongoose = require("mongoose");

var FavourSchema = new mongoose.Schema({
    skillId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Skill'
    },
    description: {
        type: String,
        required: false,
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
        name: {
            first: {
                type: String,
                required: true,
            },
            last: {
                type: String,
                required: true,
            },
        },
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
        name: {
            first: {
                type: String,
                required: true,
            },
            last: {
                type: String,
                required: true,
            },
        },
        requestTermination: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Declined', 'Completed', "Terminated"],
        required: true,
        default: 'Pending'
    },
    messages: {
        type: [String],
        required: false,
    },
});

module.exports = mongoose.model("Contract", ContractSchema);
var mongoose = require('mongoose');
var devDebug = require('debug')('app:dev');
var Config = require('./config/main'); 
var config = new Config(); //see config/main for why it's done this way.
var Contract = require("./models/contract");

var data = [
    {
        offerStatus: "in limbo"
    },
    {
        offerStatus: "not started"
    },
    {
        offerStatus: "testing"
    },
];

function seedDB() {
    Contract.remove({}, function (err) {
        if (err) {
            devDebug(err);
        } else {
            devDebug("Removed old contracts");
            data.forEach(function (seed) {
                Contract.create(seed, function (err, contract) {
                    if (err) {
                        devDebug(err);
                    } else {
                        devDebug("Added Contract");
                    }
                });
            });
        }
    });
}

function getConnection(shouldSeed) {
    mongoose.connect(config.db.connectString).then(
        (connection) => {
            devDebug("Connected to " + config.env + " DB");
            if (shouldSeed === true) {
                devDebug("WARNING: Seeding DB");
                seedDB();
            }
            return connection;
        },
        (err) => {
            devDebug(err);
        }
    );
};

module.exports.getConnection = getConnection;
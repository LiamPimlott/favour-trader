var mongoose = require("mongoose");
var Contract = require("./models/contract");
var devDebug = require('debug')('app:dev');

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

function seedDB(){
    Contract.remove({}, function(err){
        if(err){
            devDebug(err);
        } else {
            devDebug("Removed old contracts");
            data.forEach(function(seed){
                Contract.create(seed, function(err, contract){
                    if(err){
                        devDebug(err);
                    } else {
                        devDebug("Added Contract");
                    }
                });
            });
        }
    });  
}

module.exports = seedDB;
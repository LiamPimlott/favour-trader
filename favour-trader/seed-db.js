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
]
function seedDB(){
    //Remove all campgrounds
    Contract.remove({}, function(err){
        if(err){
            devDebug(err);
        } else {
            devDebug("Removed old contracts");
            //add a few campgrounds
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
    //add a few comments
}

module.exports = seedDB;
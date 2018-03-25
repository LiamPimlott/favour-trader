var devDebug = require('debug')('app:dev');
var jwt = require('jsonwebtoken');
var ConfigClass = require('../config/main');
const config = new ConfigClass();//See comments in config/main for an explanation

// DATA MODELS
var Contract = require("../models/contract");

// RETURN OBJ
var contractsLogicObj = {};

// MIDDLEWARE

contractsLogicObj.getAllUsersContracts = function(req, res, next) {
    Contract.find(
        { 
            $or: [
                { 'offeror.id': req.user.id },
                { 'offeree.id': req.user.id }
            ]
        }, 
        function (err, contracts) {
            if (err) {
                devDebug(err);
                next(err);
            } else {
                req.contracts = contracts;
                next();
            }
        }
    );
}

// EXPORT
module.exports = contractsLogicObj;
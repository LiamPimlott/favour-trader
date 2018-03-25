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

contractsLogicObj.getUsersActiveContracts = function(req, res, next) {
    Contract.find(
        {
            $or: [
                { 'offeror.id': req.user.id },
                { 'offeree.id': req.user.id }
            ],
            'status': 'Accepted',
        },
        function (err, activeContracts) {
            if (err) {
                devDebug(err);
                next(err);
            } else {
                req.activeContracts = activeContracts;
                next();
            }
        }
    );
}

contractsLogicObj.getUsersRecievedContracts = function(req, res, next) {
    Contract.find(
        {
            $and: [
                { 'offeree.id': req.user.id },
                { 'status': 'Pending' }
            ]
        },
        function (err, recievedContracts) {
            if (err) {
                devDebug(err);
                next(err);
            } else {
                req.recievedContracts = recievedContracts
                next();
            }
        }
    );
}

// EXPORT
module.exports = contractsLogicObj;
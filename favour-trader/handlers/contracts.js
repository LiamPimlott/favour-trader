var devDebug = require('debug')('app:dev');
var jwt = require('jsonwebtoken');
var ConfigClass = require('../config/main');
const config = new ConfigClass();//See comments in config/main for an explanation

// DATA MODELS (Data tier) //
var Contract = require("../models/contract");

// RETURN OBJ //
var contractsHandlers = {};

// BUSINESS LOGIC MIDDLEWARE //

contractsHandlers.getAllUsersContracts = function(req, res, next) {
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

contractsHandlers.getUsersActiveContracts = function(req, res, next) {
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

contractsHandlers.getUsersRecievedContracts = function(req, res, next) {
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

contractsHandlers.getUsersSentContracts = function(req, res, next) {
    Contract.find(
        {
            $and: [
                { 'offeror.id': req.user.id },
                { 'status': 'Pending' }
            ]
        },
        function (err, sentContracts) {
            if (err) {
                devDebug(err);
                next(err);
            } else {
                req.sentContracts = sentContracts;
                next();
            }
        }
    );
}

// EXPORT
module.exports = contractsHandlers;
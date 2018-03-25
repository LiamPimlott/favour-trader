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
                devDebug(err); // Log error.
                next(err); // Forward to error handling middleware.
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
                devDebug(err); // Log error.
                next(err); // Forward to error handling middleware.
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
                devDebug(err); // Log error.
                next(err); // Forward to error handling middleware.
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
                devDebug(err); // Log error.
                next(err); // Forward to error handling middleware.
            } else {
                req.sentContracts = sentContracts;
                next();
            }
        }
    );
}

contractsHandlers.getContractbyId = function(req, res, next) {
    Contract.findById(req.params.id).
    populate('offeror.favours').
    populate('offeror.favours.skillId').
    populate('offeree.favours').
    populate('offeree.favours.skillId').
    exec((err, foundContract) => {
        if (err) {
            devDebug(err); // Log error.
            next(err); // Forward to error handling middleware.
        } else if (!foundContract) {
            // Handle no contract found.
            res.json({ success: false, message: "Trade does not exist."})
        } else if (
            foundContract.offeror.id != req.user.id &&
            foundContract.offeree.id != req.user.id 
        ) {
            // Handle contract not belonging to user
            res.json({ success: false, message: "This contract does not belong to you."})
        } else {
            req.foundContract = foundContract;
            next();
        }
    });
}

// EXPORT
module.exports = contractsHandlers;
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

contractsHandlers.createNewContract = function(req, res, next ) {
    Contract.create(req.body, function(err, newContract) {
        if (err) {
            devDebug(err); // Log error.
            next(err); // Forward to error handling middleware.
        } else {
            req.newContract = newContract
            next();
        }
    });
}

contractsHandlers.updateContractStatus = function(req, res, next) {
    Contract.findById(req.params.id, function (err, contract) {
        const newStatus = req.body.status;
        if (err) {
            devDebug(err); // Log error.
            next(err); // Forward to error handling middleware.
        } else if (!contract) {
            res.json({ success: false, message: "Contract not found."});
        } else if ( contract.offeree.id != req.user.id ) {
            res.json({ success: false, message: "Sorry, you are not the Offeree."});
        } else if (!newStatus) {
            res.json({ success: false, message: "You must provide a new status."});
        } else if (newStatus !== 'Accepted' && newStatus !== 'Declined') {
            res.json({ success: false, message: "Invalid status provided."});
        }
        Contract.findByIdAndUpdate(
            contract._id,
            { $set: { status: newStatus }},
            { new: true }
        ).
        populate('offeror.favours').
        populate('offeror.favours.skillId').
        populate('offeree.favours').
        populate('offeree.favours.skillId').
        exec(function (err, updatedContract) {
            if (err) {
                devDebug(err); // Log error.
                next(err); // Forward to error handling middleware.
            } else {
                req.updatedContract = updatedContract;
                next();
            }
        });
    });
}

contractsHandlers.updateOfferorFavours = function(req, res, next) {
    Contract.findById(req.params.id, function (err, contract) {
        if (err) {
            devDebug(err); // Log error.
            next(err); // Forward to error handling middleware.
        } else if (!contract) {
            res.json({ success: false, message: "Contract not found."});
        } else if ( contract.offeror.id != req.user.id ) {
            res.json({ success: false, message: "Sorry, you are not the offeror."})
        } 
        contract.offeror.favours = req.body.updatedFavours;
        contract.save(function(err, updatedContract) {
            if (err) {
                devDebug(err); // Log error.
                next(err); // Forward to error handling middleware.
            } else {
                Contract.findById(updatedContract._id).
                populate('offeror.favours').
                populate('offeror.favours.skillId').
                populate('offeree.favours').
                populate('offeree.favours.skillId').
                exec((err, foundUpdatedContract) => {
                    if (err) {
                        devDebug(err); // Log error.
                        next(err); // Forward to error handling middleware.
                    } else {
                        req.successfullyUpdatedFavours = {
                            offeror: foundUpdatedContract.offeror.favours,
                            offeree: foundUpdatedContract.offeree.favours
                        };
                        next();
                    }
                });
            }
        });
    });
}

contractsHandlers.updateOffereeFavours = function(req, res, next) {
    Contract.findById(req.params.id, function (err, contract) {
        if (err) {
            devDebug(err); // Log error.
            next(err); // Forward to error handling middleware.
        } else if (!contract) {
            res.json({ success: false, message: "Contract not found."});
        } else if ( contract.offeree.id != req.user.id ) {
            res.json({ success: false, message: "Sorry, you are not the offeree."})
        } 
        contract.offeree.favours = req.body.updatedFavours;
        contract.save(function(err, updatedContract) {
            if (err) {
                devDebug(err); // Log error.
                next(err); // Forward to error handling middleware.
            } else {
                Contract.findById(updatedContract._id).
                populate('offeror.favours').
                populate('offeror.favours.skillId').
                populate('offeree.favours').
                populate('offeree.favours.skillId').
                exec((err, foundUpdatedContract) => {
                    if (err) {
                        devDebug(err); // Log error.
                        next(err); // Forward to error handling middleware.
                    } else {
                        req.successfullyUpdatedFavours = {
                            offeror: foundUpdatedContract.offeror.favours,
                            offeree: foundUpdatedContract.offeree.favours
                        };
                        next();
                    }
                });
            }
        });
    });
}

contractsHandlers.terminationRequest = function(req, res, next) {
    Contract.findById(req.params.id, function (err, contract) {
        if (err) {
            devDebug(err); // Log error.
            next(err); // Forward to error handling middleware.
        } else if (!contract) {
            res.json({ success: false, message: "Contract not found."});
        } else if (
            contract.offeror.id != req.user.id && 
            contract.offeree.id != req.user.id
        ) {
            res.json({ success: false, message: "Unauthorized."})
        } else if ( contract.status !== 'Accepted' ) {
            res.json({ success: false, message: "Contract must be active."});
        }
        const userRole = (req.user.id == contract.offeror.id) ? 'offeror' : 'offeree';
        contract[userRole].requestTermination = true;
        contract.save(function (err, updatedContract) {
            if(err) {
                devDebug(err); // Log error.
                next(err); // Forward to error handling middleware.
            } else if (
                updatedContract.offeror.requestTermination && 
                updatedContract.offeree.requestTermination
            ) {
                let completed = true;
                updatedContract.offeror.favours.forEach(function (favour) {
                    if(!favour.completed){ completed = false; }
                });
                updatedContract.offeree.favours.forEach(function (favour) {
                    if(!favour.completed){ completed = false; }
                });
                const endStatus = completed ? 'Completed' : 'Terminated';
                updatedContract.status = endStatus;
                updatedContract.save(function (err, terminatedContract) {
                    if(err){
                        devDebug(err); // Log error.
                        next(err); // Forward to error handling middleware.
                    } else {
                        req.waitingOnOtherParty = false;
                        req.updatedContract = terminatedContract;
                        next();
                    }
                });
            } else {
                req.waitingOnOtherParty = true;
                req.updatedContract = updatedContract;
                next();
            }
        }); 
    }); 
}

// EXPORT
module.exports = contractsHandlers;
var express = require('express');
var router = express.Router();
var devDebug = require('debug')('app:dev');
var passport = require('passport');

// HANDLERS (Logic tier) //
var handle = require("../handlers/contracts.js");

// DATA MODEL (Data tier) //
var Contract = require('../models/contract');

// ENDPOINTS (Web tier) //

// GET - ALL - get all contracts (admin)
router.get('/all', function (req, res, next) {
    Contract.find({}, function (err, contracts) {
        if (err) {
            devDebug(err);
            next(err);
        } else {
            res.json(contracts);
        }
    });
});

// GET - ROOT - get all of a users contracts
router.get('/',
    passport.authenticate('jwt', { session: false }),
    handle.getAllUsersContracts,
    function(req, res, next)
    {
        const contracts = req.contracts;
		if(contracts) {
			res.json({ 
				success: true,
				message: "All user's contracts retrieved.",
				contracts: contracts
			});
		} else {
			next(); // Go to error handling
		}
    }
);

// GET - RECEIVED - get all contracts for the user which are currently 'Accepted'
router.get('/active',
    passport.authenticate('jwt', { session: false }),
    handle.getUsersActiveContracts,
    function(req, res, next)
    {
        const activeContracts = req.activeContracts;
		if(activeContracts) {
			res.json({ 
				success: true,
				message: "All user's active contracts retrieved.",
				contracts: activeContracts
			});
		} else {
			next(); // Go to error handling
		}
    }
);

// GET - RECEIVED - get all contracts where user is the offeree & status is 'Pending'
router.get('/received',
    passport.authenticate('jwt', { session: false }),
    handle.getUsersRecievedContracts,
    function(req, res, next)
    {
        const recievedContracts = req.recievedContracts;
		if(recievedContracts) {
			res.json({ 
				success: true,
				message: "All user's received contracts retrieved.",
				contracts: recievedContracts
			});
		} else {
			next(); // Go to error handling
		}
    }
);

// GET - SENT - get all contracts where user is the offeror & status is 'Pending'
router.get('/sent',
    passport.authenticate('jwt', { session: false }),
    function(req, res, next)
    {
        const sentContracts = req.sentContracts;
		if(sentContracts) {
			res.json({ 
				success: true,
				message: "All user's sent contracts retrieved.",
				trade: sentContracts
			});
		} else {
			next(); // Go to error handling
		}
    }
);

// GET - Contract/ID - returns a contract by id.
router.get('/contract/:id',
    passport.authenticate('jwt', { session: false }),
    handle.getContractbyId,
    function (req, res, next) {
        const contract = req.contract;
		if(contract) {
			res.json({ 
				success: true,
				message: "Contract retrieved.",
				contract: contract
			});
		} else {
			next(); // Go to error handling
		}
    }
);

// POST - ROOT - create a contract
router.post('/',
    passport.authenticate('jwt', { session: false }),
    handle.createNewContract,
    function (req, res, next)
    {
        const newContract = req.newContract;
		if(newContract) {
			res.json({ 
				success: true,
				message: "Contract retrieved.",
				contract: newContract
			});
		} else {
			next(); // Go to error handling
		}
    }
);

// PUT - ACCEPT/DECLINE TRADE - Changes the trade's status to "Accepted" or "Declined" if requested by offeree
router.put('/:id/status',
    passport.authenticate('jwt', {session: false}),
    handle.updatedContractStatus,
    function (req, res, next) {
        const newContract = req.newContract;
		if(newContract) {
            res.json({
                success: true,
                message: "Status updated!",
                contract: updatedContract
            });
		} else {
			next(); // Go to error handling
		}
    }
);

// PUT - UPDATE OFFEROR FAVOURS - update the offeror's favours for a contract.
router.put('/:id/offeror/favours',
    passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        Contract.findById(req.params.id, function (err, contract) {
            if (err) {
                devDebug(err);
                next(err);
            } else if (!contract) {
                res.json({ success: false, message: "Contract not found."});
            } else if ( contract.offeror.id != req.user.id ) {
                res.json({ success: false, message: "Sorry, you are not the offeror."})
            } 
            contract.offeror.favours = req.body.updatedFavours;
            contract.save(function(err, updatedContract) {
                if (err) {
                    devDebug(err);
                    next(err);
                }
                Contract.findById(updatedContract._id).
                populate('offeror.favours').
                populate('offeror.favours.skillId').
                populate('offeree.favours').
                populate('offeree.favours.skillId').
                exec((err, foundContract) => {
                    if (err) {
                        devDebug(err);
                        next(err);
                    } else if (!foundContract) {
                        res.json({ success: false, message: "Trade does not exist."})
                    } else {
                        res.json({
                            success: true,
                            message: "Offeror favours updated.",
                            favours: {
                                offeror: foundContract.offeror.favours,
                                offeree: foundContract.offeree.favours
                            },
                        });
                    }
                });
            });
        });
    }
);

// PUT - UPDATE OFFEREE FAVOURS - update the offeree's favours for a contract.
router.put('/:id/offeree/favours',
    passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        Contract.findById(req.params.id, function (err, contract) {
            if (err) {
                devDebug(err);
                next(err);
            } else if (!contract) {
                res.json({ success: false, message: "Contract not found."});
            } else if ( contract.offeree.id != req.user.id ) {
                res.json({ success: false, message: "Sorry, you are not the offeree."})
            } 
            contract.offeree.favours = req.body.updatedFavours;
            contract.save(function(err, updatedContract) {
                if (err) {
                    devDebug(err);
                    next(err);
                }
                Contract.findById(updatedContract._id).
                populate('offeror.favours').
                populate('offeror.favours.skillId').
                populate('offeree.favours').
                populate('offeree.favours.skillId').
                exec((err, foundContract) => {
                    if (err) {
                        devDebug(err);
                        next(err);
                    } else if (!foundContract) {
                        res.json({ success: false, message: "Trade does not exist."})
                    } else {
                        res.json({
                            success: true,
                            message: "Offeror favours updated.",
                            favours: {
                                offeror: foundContract.offeror.favours,
                                offeree: foundContract.offeree.favours
                            },
                        });
                    }
                });
            });
        });
    }
);

// PUT - CID - REQUEST TERMINATION - request to change contract status to complete/terminate. (depending on completion of favours)
router.put('/:id/terminate',
    passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        Contract.findById(req.params.id, function (err, contract) {
            if (err) {
                devDebug(err);
                next(err);
            } else if (!contract) {
                res.json({ success: false, message: "Contract not found."});
            } else if (
                contract.offeror.id != req.user.id && 
                contract.offeree.id != req.user.id
            ){
                devDebug("OFFEROR: "+contract.offeror.id+ " OFFERee: "+contract.offeree.id+ " ID!!: "+req.user.id);
                res.json({ success: false, message: "Unauthorized."})
            } else if ( contract.status !== 'Accepted' ) {
                res.json({ success: false, message: "Contract must be active."});
            }
            const userRole = req.user.id == contract.offeror.id ? 'offeror' : 'offeree';
            contract[userRole].requestTermination = true;
            contract.save(function (err, updatedContract) {
                if(err) {
                    devDebug(err);
                    next(err);
                } else if(
                    updatedContract.offeror.requestTermination && 
                    updatedContract.offeree.requestTermination
                ){
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
                            devDebug(err);
                            next(err);
                        }
                        res.json({ success: true, message: "Contract has been terminated/completed", contract: terminatedContract });
                    });
                } else {
                    res.json({ success: false, message: "Waiting for other party to terminate.", contract: updatedContract });
                }
            }); 
        }); 
    }
);

module.exports = router;

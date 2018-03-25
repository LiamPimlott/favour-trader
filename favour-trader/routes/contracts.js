var express = require('express');
var router = express.Router();
var devDebug = require('debug')('app:dev');
var passport = require('passport');

//LOGIC MIDDLEWARE
var logic = require("../logic/contract.js");

// DATA MODEL
var Contract = require('../models/contract');

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
    logic.getAllUsersContracts,
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
			next();
		}
    }
);

// GET - RECEIVED - get all contracts for the user which are currently 'Accepted'
router.get('/active',
    passport.authenticate('jwt', { session: false }),
    logic.getUsersActiveContracts,
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
			next();
		}
    }
);

// GET - RECEIVED - get all contracts where user is the offeree & status is 'Pending'
router.get('/received',
    passport.authenticate('jwt', { session: false }),
    logic.getUsersRevievedContracts,
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
			next();
		}
    }
);

// GET - SENT - get all contracts where user is the offeror & status is 'Pending'
router.get('/sent',
    passport.authenticate('jwt', { session: false }),
    function(req, res, next)
    {
        Contract.find(
            {
                $and: [
                    { 'offeror.id': req.user.id },
                    { 'status': 'Pending' }
                ]
            },
            function (err, contracts) {
            if (err) {
                devDebug(err);
                next(err);
            } else {
                res.json(contracts);
            }
        });
    }
);

// GET - Contract/ID - returns a contract by id.
router.get('/contract/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    Contract.findById(req.params.id).
    populate('offeror.favours').
    populate('offeror.favours.skillId').
    populate('offeree.favours').
    populate('offeree.favours.skillId').
    exec((err, foundTrade) => {
        if (err) {
            devDebug(err);
            next(err);
        } else if (!foundTrade) {
            res.json({ success: false, message: "Trade does not exist."})
        } else {
            res.json({ success: true, message: "Trade retrieved.", trade: foundTrade});
        }
    });
});

// POST - ROOT - create a contract
router.post('/',
    passport.authenticate('jwt', { session: false }),
    function (req, res, next)
    {
        const newContract = new Contract({
            offeror: {
                id: req.body.offeror.id,
                favours: req.body.offeror.favours,
                name: {
                    first: req.body.offeror.name.first,
                    last: req.body.offeror.name.last,
                },
            },
            offeree: {
                id: req.body.offeree.id,
                favours: req.body.offeree.favours,
                name: {
                    first: req.body.offeree.name.first,
                    last: req.body.offeree.name.last,
                },
            },
            messages: req.body.messages
        });
        newContract.save({}, function (err, contract) {
            if (err) {
                devDebug(err);
                res.status = 400;
                res.json({success: false, message: "Required fields are missing."});
            } else {
                res.json(contract);
            }
        });
    }
);

// PUT - ACCEPT/DECLINE TRADE - Changes the trade's status to "Accepted" or "Declined" if requested by offeree
router.put('/:id/status',
    passport.authenticate('jwt', {session: false}),
    function (req, res, next) {
        Contract.findById(req.params.id, function (err, contract) {
            const newStatus = req.body.status;
            if (err) {
                devDebug(err);
                next(err);
            } else if (!contract) {
                res.json({ success: false, message: "Contract not found."});
            } else if ( contract.offeree.id != req.user.id ) {
                res.json({ success: false, message: "Sorry, you are not the Offeree."});
            } else if (!newStatus) {
                res.json({ success: false, message: "You must provide a new status."});
            } else if (newStatus !== 'Accepted' && newStatus !== 'Declined') {
                res.json({ success: false, message: "Invalid status provided."});
            }
            Contract.findByIdAndUpdate(contract._id,
                { $set: { status: newStatus }},
                { new: true }
            ).
            populate('offeror.favours').
            populate('offeror.favours.skillId').
            populate('offeree.favours').
            populate('offeree.favours.skillId').
            exec(function (err, updatedContract) {
                if (err) {
                    devDebug(err);
                    next(err);
                } else {
                    res.json({ success: true, message: "Status updated!", contract: updatedContract });
                }
            });
        });
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

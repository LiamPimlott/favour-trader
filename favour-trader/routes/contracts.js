var express = require('express');
var router = express.Router();
var devDebug = require('debug')('app:dev');
var passport = require('passport');

// Data Model
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
    function(req, res, next)
    {
        Contract.find({ 
            $or: [
                { 'offeror.id': req.user.id },
                { 'offeree.id': req.user.id }
            ]}, function (err, contracts) {
            if (err) {
                devDebug(err);
                next(err);
            } else {
                res.json(contracts);
            }
        });
    }
);

// GET - RECEIVED - get all contracts for the user which are currently 'Accepted'
router.get('/active',
    passport.authenticate('jwt', { session: false }),
    function(req, res, next)
    {
        Contract.find(
            {
                $or: [
                    { 'offeror.id': req.user.id },
                    { 'offeree.id': req.user.id }
                ],
                'status': 'Accepted',
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

// GET - RECEIVED - get all contracts where user is the offeree & status is 'Pending'
router.get('/received',
    passport.authenticate('jwt', { session: false }),
    function(req, res, next)
    {
        Contract.find(
            {
                $and: [
                    { 'offeree.id': req.user.id },
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

// DELETE - CID - REQUEST TERMINATION - request to terminate a contract
router.put('/:id/terminate',
    passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        Contract.findById(req.params.id, function (err, contract) {
            if (err) {
                devDebug(err);
                next(err);
            } else if (!contract) {
                res.json({ success: false, message: "Contract not found."});
            } else if ( //This can be middleware eventually to dry up code
                contract.offeror.id != req.user.id && 
                contract.offeree.id != req.user.id
            ){
                devDebug("OFFEROR: "+contract.offeror.id+ " OFFERee: "+contract.offeree.id+ " ID!!: "+req.user.id);
                res.json({ success: false, message: "Unauthorized."})
            } else if ( contract.status === 'Accepted' ) {
                res.json({ success: false, message: "Contract has already been accepted."});
            } else {
                Contract.findByIdAndRemove(contract._id, function(err) {
                    if (err) {
                        devDebug(err);
                        next(err);
                    }
                    res.json({ 
                        success: true, 
                        message: "Contract Terminated."
                    });
                });
            } 
        }); 
    }
);

module.exports = router;

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
        devDebug(req.user.id);
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

// GET - USERS/ID - returns a user's profile by their id.
router.get('/contract/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    Contract.findById(req.params.id).
    exec( (err, foundTrade) => {
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

// GET - RECEIVED - get all contracts for the user which are currently 'accepted'
router.get('/active',
    passport.authenticate('jwt', { session: false }),
    function(req, res, next)
    {
        Contract.find({
            $or: [
                { 'offeror.id': req.user.id },
                { 'offeree.id': req.user.id }
            ],
            $and: [
                { 'status': 'accepted'},
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

// GET - RECEIVED - get all contracts where user is the offeree
router.get('/received',
    passport.authenticate('jwt', { session: false }),
    function(req, res, next)
    {
        Contract.find({
            'offeree.id': req.user.id
            }, function (err, contracts) {
            if (err) {
                devDebug(err);
                next(err);
            } else {
                res.json(contracts);
            }
        });
    }
);

// GET - SENT - get all contracts where user is the offeror
router.get('/sent',
    passport.authenticate('jwt', { session: false }),
    function(req, res, next)
    {
        Contract.find({
            'offeror.id': req.user.id
            }, function (err, contracts) {
            if (err) {
                devDebug(err);
                next(err);
            } else {
                res.json(contracts);
            }
        });
    }
);

// PUT - ROOT - update a contract by its id  (this actaully may not be necessary for mvp)
router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        Contract.findById(req.params.id, function (err, contract) {
            if (err) {
                devDebug(err);
                next(err);
            } else if (!contract) {
                res.json({ success: false, message: "Contract not found."});
            } else if ( //This can be middleware eventually to dry up code
                contract.offeror.id !== req.user.id && 
                contract.offeree.id !== req.user.id
            ){
                res.json({ success: false, message: "Unauthorized."})
            } else {
                Contract.findByIdAndUpdate(contract._id, function (err, updatedContract) {
                    if (err || !contract) {
                        devDebug(err);
                        next(err);
                    } else {
                        res.json(updatedContract);
                    }
                })
                res.json({ success: true, message: "Contract Updated.", contract: contract})
            }
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
                contract.offeror.id !== req.user.id && 
                contract.offeree.id !== req.user.id
            ){
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

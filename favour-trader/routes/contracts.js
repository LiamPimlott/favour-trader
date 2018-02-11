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

// POST - ROOT - create a contract
router.post('/',
    passport.authenticate('jwt', { session: false }),
    function (req, res, next)
    {
        const newContract = new Contract({  
            offeror: {
                id: req.user.id,
                favours: req.body.offeror.favours
            },
            offeree: {
                id: req.body.offeree.id,
                favours: req.body.offeree.favours
            },  
        });
        devDebug(req.body.offeree.favours);
        newContract.save({}, function (err, contract) {
            if (err) {
                devDebug(err);
                res.json({ success: false, message: "Required fields are missing."})
            } else {
                res.json(contract);
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

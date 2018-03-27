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
    handle.getUsersSentContracts,
    function(req, res, next)
    {
        const sentContracts = req.sentContracts;
		if(sentContracts) {
			res.json({ 
				success: true,
				message: "All user's sent contracts retrieved.",
				contracts: sentContracts
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
        const foundContract = req.foundContract;
		if(foundContract) {
			res.json({ 
				success: true,
				message: "Contract retrieved.",
				contract: foundContract
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
    handle.updateContractStatus,
    function (req, res, next) {
        const updatedContract = req.updatedContract;
		if(updatedContract) {
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
    handle.updateOfferorFavours,
    function (req, res, next) {
        const successfullyUpdatedFavours = req.successfullyUpdatedFavours;
		if(successfullyUpdatedFavours) {
            res.json({
                success: true,
                message: "Offeror favours updated.",
                favours: successfullyUpdatedFavours,
            });
		} else {
			next(); // Go to error handling
		}
    }
);

// PUT - UPDATE OFFEREE FAVOURS - update the offeree's favours for a contract.
router.put('/:id/offeree/favours',
    passport.authenticate('jwt', { session: false }),
    handle.updateOffereeFavours,
    function (req, res, next) {
        const successfullyUpdatedFavours = req.successfullyUpdatedFavours;
		if(successfullyUpdatedFavours) {
            res.json({
                success: true,
                message: "Offeree favours updated.",
                favours: successfullyUpdatedFavours,
            });
		} else {
			next(); // Go to error handling
		}
    }
);

// PUT - CID - REQUEST TERMINATION - request to change contract status to complete/terminate. (depending on completion of favours)
router.put('/:id/terminate',
    passport.authenticate('jwt', { session: false }),
    handle.terminationRequest,
    function (req, res, next) {
        const waitingOnOtherParty = req.waitingOnOtherParty;
        const updatedContract = req.updatedContract;
        if(waitingOnOtherParty !== undefined && updatedContract) {
            const responseMessage = waitingOnOtherParty ? 
            "Waiting for other party to terminate." :
            "Contract has been terminated/completed.";
            res.json({ 
                success: true,
                message: responseMessage,
                contract: updatedContract
            });
        } else {
            next(); // Goto error handling
        }
    }
);

module.exports = router;

var express = require('express');
var jwt = require('jsonwebtoken');
var ConfigClass = require('../config/main');
const config = new ConfigClass();//See comments in config/main for an explanation
var router = express.Router();
var devDebug = require('debug')('app:dev');
var passport = require('passport');

// HANDLERS (Logic tier) //
var handle = require("../handlers/users.js");

// DATA MODELS (Data Tier) //
var User = require('../models/user');

// ENDPOINTS (Web tier) //

// GET - ALL - WARNING: unsecure, should be accesible only to admins.
router.get('/all', function(req, res, next) {
	User.find({}, function(err, users){
		if (err) {
			devDebug(err);
			next();
		} else {
			res.json(users);
		}
	});
});

// GET - AUTH - Test if a token passed in is valid.
router.get('/auth',
	passport.authenticate('jwt', { session: false }),
	function(req, res) {
		res.send('Token is valid! User name is: ' + req.user.name.first + ' ' + req.user.name.last);
	});

// GET - USERS - returns the currently logged in user's profile.
router.get('/profile',
	passport.authenticate('jwt', { session: false }),
	handle.getCurrentUserProfile,
	function (req, res, next) {
		const userProfile = req.userProfile;
		if(userProfile) {
			res.json({ 
				success: true,
				message: "Your profile has been retrieved.",
				user: userProfile
			});
		} else {
			next();
		}
	});

// GET - USERS/ID - returns a user's profile by their id.
router.get('/:id/profile',
	passport.authenticate('jwt', { session: false }),
	handle.getProfileById,
	function (req, res, next) {
		const foundUser = req.foundUser;
		if(foundUser) {
			res.json({ 
				success: true,
				message: "User profile retrieved.",
				user: foundUser
			});
		} else {
			next();
		}
	});

// POST - HAS - returns the currently logged in user's has.
router.get('/has',
	passport.authenticate('jwt', { session: false }),
	handle.getCurrentUserHas,
	function (req, res, next) {
		const userHas = req.userHas 
		if(userHas) {
			res.json({
				success: true,
				message: "User's has skills retrieved.",
				user: userHas
			});
		} else {
			next();
		}
	});

// POST - WANTS - returns the currently logged in user's wants.
router.get('/wants',
	passport.authenticate('jwt', { session: false }),
	handle.getCurrentUserWants,
	function (req, res, next) {
		const userWants = req.userWants 
		if(userWants) {
			res.json({
				success: true,
				message: "User's wanted skills retrieved.",
				user: userWants
			});
		} else {
			next();
		}
	});

// POST - REGISTER - Create a new user with a unique email.
router.post('/register', 
	handle.createNewUserFromBody,
	handle.registerNewUser,
	function(req, res, next) {
		const newUserToken = req.token;
		if(newUserToken) {
			res.json({
				success: true,
				message: 'Successfully created new user.',
				token: ('Bearer ' + newUserToken)
			});
		} else {
			next();
		}
	});

// POST - LOGIN - authenticate user and return a JWT.
router.post('/login',
	handle.logUserIn,
	function(req, res, next) {
		const loginToken = req.token;
		if(loginToken) {
			res.json({
				success: true,
				message: 'Login successful.',
				token: ('Bearer ' + loginToken)
			});
		} else {
			next();
		}
	});

// PUT - UPDATE - updates a user profile with provided fields
router.put('/update',
	passport.authenticate('jwt', { session: false }),
	handle.updateUser,
	function(req, res, next) {
		const updatedUser = req.updatedUser;
		if(updatedUser) {
			res.json({
				success: true,
				message: "User updated.",
				user: updatedUser
			});
		} else {
			next();
		}
	});

// GET - MATCHES - returns a json object containing all the users your has and wants line up with.
router.get('/matches',
	passport.authenticate('jwt', { session: false }),
	handle.getMatchedUsers,
	function(req, res, next) {
		const matchedUsers = req.matchedUsers;
		if(matchedUsers){
			res.json({
				success: true,
				message: "User matches found.",
				matches: req.matchedUsers,
			});
		} else {
			next();
		}
 	});

 // DELETE - DELETE - deletes the user associated with the provided token from the db.
router.delete('/delete', passport.authenticate('jwt', { session: false }), function(req, res) {
	User.findByIdAndRemove(req.user.id, (err) => {
		if (err) {
			devDebug(err);
			res.json({ success: false, message: "Could not delete user."});
		}
		res.json({ 
			success: true, 
			message: "User " + req.user.name.first + " " + req.user.name.last + " deleted."
		});
	});
});

module.exports = router;
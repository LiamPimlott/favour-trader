var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config/main');
var router = express.Router();
var devDebug = require('debug')('app:dev');
var passport = require('passport');

// DATA MODELS
var User = require('../models/user');

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

// GET - AUTH - tests if a token passed is valid
router.get('/auth', passport.authenticate('jwt', { session: false }), function(req, res) {
	res.send('Token is valid! User name is: ' + req.user.name.first + ' ' + req.user.name.last);
});

// POST - REGISTER - Create a new user with a unique email.
router.post('/register', function(req, res) {
	if(!req.body.email || !req.body.password) {
		res.json({ success: false, message: "Please enter an email and password to register."})
	} else {
		var newUser = new User({
			email: req.body.email,
			password: req.body.password,
			name: req.body.name,
			address: req.body.address,
		});
		// attempt to save the new user
		newUser.save(function(err, newUser) {
			if (err) {
				devDebug(err);
				res.json({ success: false, message: "Email already exists or fields missing."});
			} else {
				res.json({
					success: true,
					message: 'Successfully created new user.',
				});
			}
		})
	}
});

// POST - LOGIN - authenticate user and return a JWT.
router.post('/login', function(req, res) {
	User.findOne({ email: req.body.email }, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({ success: false, message: 'User not found.'});
		} else {
			// Check if password matches
			user.comparePassword(req.body.password, function(err, isMatch) {
				if (err) {
					devDebug(err);
					res.json({ success: false, message: "Internal server error."});
				} else if (isMatch && !err) {
					const userPayload = {
						id: user._id,
						email: user.email,
						name: user.name,
						role: user.role
					};
					// Create the token. (note, should this have err handling?)
					var token = jwt.sign(userPayload, config.jwt.secret, {
						expiresIn: 120 // in seconds
					});
					res.json({ 
						success: true,
						message: "Login successful.",
						token: 'Bearer ' + token,
						isAuth: req.isAuthenticated()
					})
				} else {
					res.json({ success: false, message: "Incorrect password."});
				}
			})
		}
	})
})

// PUT - UPDATE - updates a user profile
router.put('/update', passport.authenticate('jwt', { session: false }), function(req, res, next) {
	User.findByIdAndUpdate(req.user.id, req.body, (err, updatedUser) => {
		if (err) {
			devDebug(err);
			next(err);
		} else {
			devDebug("Returning updated user: " + updatedUser);
			res.json({
				success: true,
				message: "User updated.",
				user: updatedUser
			});
		}
	});
});

// GET - MATCHES - returns a json object containing all the users your has and wants line up with.
router.get('/matches', passport.authenticate('jwt', { session: false }), function(req, res, next) {
	User.findById(req.user.id, 'wants', (err, userWants) => {
		if (err) {
			devDebug(err);
			next(err);
		} else {
			User.find({ has: { $elemMatch: { $in: req.user.wants } } }).
			select('name about has wants').
			populate('has').
			populate('wants').
			exec( (err, matchedUsers) => {
				if (err) {
					devDebug(err);
					next(err);
				} else {
					devDebug('Returning matched users: ' + users);
					res.json({
						success: true,
						message: "User matches found.",
						matches: matchedUsers,
					});
				}
			});
		}
	})
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
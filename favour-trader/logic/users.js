var devDebug = require('debug')('app:dev');
var jwt = require('jsonwebtoken');
var ConfigClass = require('../config/main');
const config = new ConfigClass();//See comments in config/main for an explanation

// DATA MODELS
var User = require("../models/user");

// RETURN OBJ
var usersLogicObj = {};

// MIDDLEWARE

usersLogicObj.getCurrentUserProfile = function(req, res, next) {
	User.findById(req.user.id).
	select('name address email about has wants').
	populate('has.category').
	populate('wants.category'). 
	exec( (err, foundUser) => {
		if (err) {
			devDebug(err);
			next(err);
		} else if (!foundUser) {
			res.json({ success: false, message: "User does not exist."})
		} else {
			req.userProfile = foundUser;
			next();
		}
	});
}

usersLogicObj.getProfileById = function(req, res, next) {
	User.findById(req.params.id).
	select('name address about has wants').
	populate('has.category').
	populate('wants.category'). 
	exec( (err, foundUser) => {
		if (err) {
			devDebug(err);
			next(err);
		} else if (!foundUser) {
			res.json({ success: false, message: "User does not exist."})
		} else {
			req.foundUser = foundUser;
			next();
		}
	});
}

usersLogicObj.getCurrentUserHas = function(req, res, next) {
	User.findById(req.user.id).
	select('has').
	populate('has.category').
	exec( (err, userHas) => {
		if (err) {
			devDebug(err);
			next(err);
		} else {
			req.userHas = userHas;
			next();
		}
	});
}

usersLogicObj.getCurrentUserWants = function(req, res, next) {
	User.findById(req.user.id).
	select('wants').
	populate('wants.category').
	exec( (err, userWants) => {
		if (err) {
			devDebug(err);
			next(err);
		} else {
			req.userWants = userWants;
			next();
		}
	})
}

usersLogicObj.createNewUserFromBody = function(req, res, next) {
	if (!req.body.email || !req.body.password) {
		res.json({ success: false, message: "Please enter an email and password to register."});
	} else if (!req.body.firstName || !req.body.lastName) {
		res.json({ success: false, message: "Please enter your name to register."})
	} else {
		req.newUser = new User({
			email: req.body.email,
			password: req.body.password,
			name: {
				first: req.body.firstName,
				last: req.body.lastName
			},
			address: {
                country: '-',
                state: '-',
                city: '-',
			}
		});
		next();
	}
}

usersLogicObj.registerNewUser = function(req, res, next) {
	// attempt to save the new user
	const newUser = req.newUser;
	devDebug("IN REGISTER MIDDLEWARE: " + req.newUser);
	if(newUser) {
		newUser.save(function(err, user) {
			if (err) {
				devDebug(err);
				res.json({ success: false, message: "Email already exists or required fields missing.", error: err});
			} else {
				const userPayload = {
					id: user._id,
					email: user.email,
					name: user.name,
					role: user.role
				};
				req.token = jwt.sign(userPayload, config.jwt.secret, {
					expiresIn: 3600 // in seconds
				});
				next();
			}
		});
	} else {
		next();
	}
}

usersLogicObj.logUserIn = function(req, res, next) {
	if(!req.body.email){
		res.json({ success: false, message: "No email provided."});
	} else if (!req.body.password) {
		res.json({ success: false, message: "No password provided."});
	} else {
		User.findOne({ email: req.body.email }, function(err, user) {
			if (err) {
				devDebug(err);
				next(err);
			} else if (!user) {
				res.json({ success: false, message: 'User not found.'});
			} else {
				// Check if password matches
				user.comparePassword(req.body.password, function(err, isMatch) {
					if (err) {
						devDebug(err);
						next(err);
					} else if (isMatch && !err) {
						const userPayload = {
							id: user._id,
							email: user.email,
							name: user.name,
							role: user.role
						};
						// Create the token. (note, should this have err handling?)
						req.token = jwt.sign(userPayload, config.jwt.secret, {
							expiresIn: 3600 // 1 hour in seconds
						});
						next()
					} else {
						res.json({ success: false, message: "Incorrect password."});
					}
				})
			}
		})
	}
}

usersLogicObj.updateUser = function(req, res, next) {
	User.findByIdAndUpdate(req.user.id, req.body, {new: true})
	.populate('has.category')
	.populate('wants.category')
	.exec((err, updatedUser) => {
		if (err) {
			devDebug(err);
			next(err);
		} else {
			req.updatedUser = updatedUser;
			next();
		}
	});
}

usersLogicObj.getMatchedUsers = function(req, res, next) {
    User.findById(req.user.id, 'wants has', (err, user) => {
		if (err) {
			devDebug(err);
			next(err);
		} else {
			const hasFilter = req.query.hasFilter;
			const wantsFilter = req.query.wantsFilter;
			const userHasArray = user.has.map( skill => {
				return skill.category;
			});
			const userWantsArray = user.wants.map( skill => {
				return skill.category;
			});
			let matches;
			if(hasFilter == 'true' && wantsFilter == 'false')
			{
				matches = User.find({ 
					$and: [
						{ "has.category": { $in: userWantsArray } },
						{ _id: { $ne: user._id } },
					]
				})
			}
			else if(wantsFilter == 'true' && hasFilter == 'false')
			{
				matches = User.find({ 
					$and: [
						{ "wants.category": { $in: userHasArray } },
						{ _id: { $ne: user._id } },
					]
				})
			} else {
				matches = User.find({ 
					$and: [
						{ "has.category": { $in: userWantsArray } },
						{ "wants.category": { $in: userHasArray } },
						{ _id: { $ne: user._id } },
					]
				})
			}
			matches.
				select('name address email about has wants').
				populate('has.category').
				populate('wants.category');
			matches.exec( (err, matchedUsers) => {
				if (err) {
					devDebug(err);
					next(err);
				} else if (matchedUsers.length <= 0) {
					res.json({ success: false, message: "Sorry, you dont have any matches :(\nTry updating your desired skills."});
				} else {
					req.matchedUsers = matchedUsers;
					next();
				}
			});
		}
	});
}

// EXPORT
module.exports = usersLogicObj;
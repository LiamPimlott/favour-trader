var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config/main');
var router = express.Router();
var devDebug = require('debug')('app:dev');
var passport = require('passport');


// DATA MODELS
var User = require('../models/user');

/* GET users listing. */
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

// TEST AUTH - tests authentication with jwt bearer header
router.get('/auth', passport.authenticate('jwt', { session: false }), function(req, res) {
	res.send('It worked! User name is: '+ req.user);
});

// CREATE - Create a new user with a unique email.
router.post('/register', function(req, res, next) {
	if(!req.body.email || !req.body.password) {
		res.json({ success: false, message: "Please enter an email and password to register."})
	} else {
		var newUser = new User({
			email: req.body.email,
			password: req.body.password,
			name: {
				first: req.body.firstName,
				last: req.body.lastName,
			},
			address: {
                number: req.body.streetNumber,
                street: req.body.streetName,
                postalCode: req.body.postalCode,
                city: req.body.city,
                state: req.body.province,
                country: req.body.country
            },
		});
		// attempt to save the new user
		newUser.save(function(err) {
			if (err) {
				devDebug(err);
				res.json({ success: false, message: "Email already exists or fields missing."});
			} else {
				res.json({success: true, message: 'Successfully created new user.'});
			}
		})
	}
});

// LOGIN - authenticate user and get a JWT
router.post('/login', function(req, res) {
	User.findOne({ email: req.body.email }, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({ success: false, message: 'User not found.'});
		} else {
			// Check if password matches
			user.comparePassword(req.body.password, function(err, isMatch) {
				if (err) {
					res.send("error");
				} else if (isMatch && !err) {
					// Create the token
					devDebug(user.toJSON());
					const userPayload = {
						id: user._id,
						email: user.email,
						name: user.name,
						role: user.role
					};
					// need err handling?
					var token = jwt.sign(userPayload, config.jwt.secret, {
						expiresIn: 60 // in seconds
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

//


router.get('/retrieve-all', function(req, res, next) {
	User.find(function(err, users) {
 		if (err){
 			res.send(err);
 		} else{
 			res.json(users)
		} 		
 	});
 });
router.get('/retrieve', function(req, res, next) {
	var query = User.findOne({ 'name': 'Ismail' });

	// selecting the `name` fields
	query.select('name');

	// execute the query at a later time
	query.exec(function (err, person) {
  		if (err) {
  			res.send(err);
  		} else {
  			res.json(person);
  		}
  	
	});
});
router.delete('/delete', function(req, res, next) {
	var query = User.deleteOne({ 'name': 'Ismail' });

	// selecting the `name` and `occupation` fields
	query.select('name');

	// execute the query at a later time
	query.exec(function (err, writeOpResult) {
  		if (err) {
  			res.send(err);
  		} else {
  			res.send("User was Successfully deleted")
  		}
  	
	});
});

module.exports = router;

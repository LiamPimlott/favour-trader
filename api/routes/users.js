var express = require('express');
var router = express.Router();

// DATA MODELS
var User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({firstRequest: "Hello world! in Users"});
});

router.post('/create', function(req, res, next) {
	var  user = new User();
	user.name = 'Ismail';
	user.save(function(err){
 		if (err)
 			res.send(err);
 		else
 			res.json({message: 'User Successfully Added'});
	});
});
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

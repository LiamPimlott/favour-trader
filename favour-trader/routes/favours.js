var express = require('express');
var router = express.Router();

// Data Model
var Favour = require('../models/favours');

/* GET root endpoint. */
router.get('/', function(req, res, next) {
  //We could access our Favours collection via Favour
  res.json({firstRequest: "Hello world!"});
});

module.exports = router;

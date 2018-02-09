var express = require('express');
var router = express.Router();
var devDebug = require('debug')('app:dev');

// Data Model
var Contract = require('../models/contract');

/* GET root endpoint. */
router.get('/', function (req, res, next) {
    //We could access our Favours collection via Favour
    Contract.find({}, function (err, allContracts) {
        if (err) {
            devDebug(err);
        } else {
            res.json(allContracts);
        }
    })
});

module.exports = router;

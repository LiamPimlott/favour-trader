const express = require('express');
const router = express.Router();
const devDebug = require('debug')('app:dev');
var passport = require('passport');

// DATA MODELS
let Skill = require('../models/skill');

/* GET skill listing. */
router.get('/all', function(req, res, next) {
    Skill.find({}, function(err, skills){
        if (err) {
            devDebug(err);
            next();
        } else {
            res.json(skills);
        }
    });
});
module.exports = router;
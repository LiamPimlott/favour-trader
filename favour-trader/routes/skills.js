const express = require('express');
const router = express.Router();
const devDebug = require('debug')('app:dev');
var passport = require('passport');
let msg = null;

let skillsList = [{
    "skill": "Plumbing"
}, {
    "skill": "Painting"
}, {
    "skill": "Electrical"
}, {
    "skill": "Automotive"
}, {
    "skill": "Cleaning"
}, {
    "skill": "LandScaping"
}, {
    "skill": "Gardening"
}, {
    "skill": "Cooking"
}, {
    "skill": "Driving"
}, {
    "skill": "Computer Repair"
}];

// DATA MODELS
let Skill = require('../models/skill');

/* GET users listing. */
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
router.get('/deleteall', function(req, res, next) {
    Skill.remove(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('skills list is empty');
        }
    })
});
router.post('/populate', function (req, res, next) {
    for (let i=0; i<skillsList.length; i++) {
        let skill = new Skill();
        skill.skill = skillsList[i].skill;
        skill.save((err) => {
           if (err) {
               devDebug(err);
           } else {
               msg = "Success";
           }
        });
    }
    res.send(msg)
});

module.exports = router;
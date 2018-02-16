var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user');
var ConfigClass = require('../config/main'); 
const config = new ConfigClass(); //see config/main for why it's done this way.
var devDebug = require('debug')('app:dev');

// Sets up passport JwtStrategy 
module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.jwt.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findById(jwt_payload.id, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};
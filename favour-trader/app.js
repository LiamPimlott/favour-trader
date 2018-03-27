// NPM PACKAGES (Some of these may end up getting removed eg. pug, favicon...etc)
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug')('app:production');
const devDebug = require('debug')('app:dev');
const passport = require('passport');
// LOCAL IMPORTS
const db = require('./db');
var ConfigClass = require('./config/main'); //see config/main for why it's done this way.
const config = new ConfigClass();
// IMPORTING ROUTES
const users = require('./routes/users');
const favours = require('./routes/contracts');
const skills = require('./routes/skills');

////////////////
// APP CONFIG //
////////////////

// connecting to DB
db.getConnection(config.db.seedDB);
// logs requests to console
app.use(logger('dev'));
// use body parser to get POST requests for API use.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// parse cookies (may not need later since were using jwt, not sure yet)
app.use(cookieParser());
// point express to our static create-react-app bundle
app.use(express.static(path.join(__dirname, 'client/build')));
// passport config
app.use(passport.initialize());
require('./config/passport')(passport);


////////////////////////
// REGISTERING ROUTES //
////////////////////////

app.use('/api/users', users);
app.use('/api/skills', skills);
app.use('/api/contracts', favours);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    devDebug("Sending create-react-app build");
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

////////////////////
// ERROR HANDLING //
////////////////////

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.APPENV === 'development' ? err : {};

    let text = 'Error';

    // Set status and message.
    if(err.name === 'ValidationError'){
        res.status(400);
        text = 'Required fields are missing.';
    } else {
        res.status(err.status || 500);
    }
    res.send(text);
});

module.exports = app;


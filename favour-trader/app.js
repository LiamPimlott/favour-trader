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
const config = require("./config/main");
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
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// passport config
app.use(passport.initialize());
require('./config/passport')(passport);


////////////////////////
// REGISTERING ROUTES //
////////////////////////

app.use('/api/users', users);
app.use('/api/skills', skills);
app.use('/contracts', favours);

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

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
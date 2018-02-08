// NPM PACKAGES (Some of these may end up getting removed eg. pug, favicon...etc)
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('app:production');
var devDebug = require('debug')('app:dev');
var passport = require('passport');
var jwt = require('jsonwebtoken');

// LOCAL IMPORTS
var db = require('./db');

// IMPORTING ROUTES
var users = require('./routes/users');
var favours = require('./routes/contracts');

////////////////
// APP CONFIG //
////////////////

// connecting to DB
const seedDB = false;
db.getConnection(seedDB);
// logs requests to console
app.use(logger('dev'));
// use body parser to get POST requests for API use.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// parse cookies (may not need later since were using jwt, not sure yet)
app.use(cookieParser());
// point express to our static create-react-app bundle
app.use(express.static(path.join(__dirname, 'client/build')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

////////////////////////
// REGISTERING ROUTES //
////////////////////////

app.use('/users', users);
app.use('/contracts', favours);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  devDebug("Sending create-react-app build");
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

////////////////////
// ERROR HANDLING //
////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.APPENV === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

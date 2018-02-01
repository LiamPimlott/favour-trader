// REQUIRED PACKAGES (Some of these may end up getting removed eg. pug, favicon...etc)
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('app:production');
var devDebug = require('debug')('app:dev');
var db = require('./db');

// IMPORTING ROUTES
var users = require('./routes/users');
var favours = require('./routes/favours');

// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// APP CONFIG
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

///////////////////////////
// REGISTERING OUR ROUTES//
///////////////////////////

app.use('/users', users);
app.use('/favours', favours);

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

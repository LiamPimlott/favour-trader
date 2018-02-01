var Promise = require('promise');
var mongoose = require('mongoose');
var devDebug = require('debug')('app:dev');

function loadConfig(){
  return new Promise(function (fulfill, reject){
  		var config = require('./config');
  		var dbconfig = new config.dbConfig();
    	fulfill(dbconfig);
    });
}

function connect(){
    loadConfig().done(function (config){
     	mongoose.connect(config.uri).then (
		(connection) => {
			devDebug("Development DB is loaded")
			module.exports.db = connection
		},
		(err) => {
			console.log(err);
		} 
	)
    });
}

connect();









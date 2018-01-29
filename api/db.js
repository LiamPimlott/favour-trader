var config = require('./config.js');
var mongoose = require('mongoose');

var dbConf = new config.dbConfig();
var userName = dbConf.userName;
var password = dbConf.password;
const uri = "mongodb://"+userName+":"+password+"@favor-trader-shard-00-00-djlzv.mongodb.net:27017,favor-trader-shard-00-01-djlzv.mongodb.net:27017,favor-trader-shard-00-02-djlzv.mongodb.net:27017/test?ssl=true&replicaSet=favor-trader-shard-0&authSource=admin";


mongoose.connect(uri).then (
	(connection) => {
		module.exports.db = connection
	},
	(err) => {
		console.log(err);
	} 
);

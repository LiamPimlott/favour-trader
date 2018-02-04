var devDebug = require('debug')('app:dev');

class dbConfig {
	constructor() {
		var appEnv = process.env.APPENV;
		if (process.env.APPENV === 'production') {
			this.userName = "prod";
			this.password = "prod";
			this.uri = "mongodb://"+this.userName+":"+this.password+"@favor-trader-shard-00-00-djlzv.mongodb.net:27017,favor-trader-shard-00-01-djlzv.mongodb.net:27017,favor-trader-shard-00-02-djlzv.mongodb.net:27017/test?ssl=true&replicaSet=favor-trader-shard-0&authSource=admin";
		}
		if (process.env.APPENV === 'development') {
			devDebug("Dev DB config is Loading"); 
			this.userName = "dev";
			this.password = "dev";
			this.uri = "mongodb://"+this.userName+":"+this.password+"@favour-trader-dev-shard-00-00-apfb7.mongodb.net:27017,favour-trader-dev-shard-00-01-apfb7.mongodb.net:27017,favour-trader-dev-shard-00-02-apfb7.mongodb.net:27017/test?ssl=true&replicaSet=Favour-Trader-Dev-shard-0&authSource=admin";
		}
    }
}

module.exports = {
	dbConfig: dbConfig
	};
devDebug('DB config is exported');


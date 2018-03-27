/* 
 * Basically, this chunk of code returns the config.
 * Rather, it exports a function that does that.
 * Before, what happened when the config was being created is that it was a constant, unchanging JSON object that config/main returned. This caused a lot of problems with connecting to an alternate DB in that it just didn't happen for me.
 * config/main now returns a function that returns an instance of our config variable (as far as I can tell). It changes the instance based on the environment set (currently only test and dev). I think this is a solid way to handle environment changes.
 * 
 * When it's required, the data can be accessed like this:
 * var ConfigClass = require('../config/main');
 * const config = new ConfigClass();
 */

var config = {
    env: process.env.NODE_ENV,
    debug: process.env.DEBUG,
    db: {
        prefix: process.env.DB_PREFIX,
        connectString: process.env.DB_PREFIX + process.env.DB_USER + ':' + process.env.DB_PASS + process.env.DB_HOST,
        seedDB: process.env.DB_SEED
    },
    jwt: {
        secret: process.env.JWT_SECRET
    }
};

module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'acceptance':
            config.db.connectString = process.env.DB_PREFIX + process.env.ACCEPT_DB_USER + ':' + process.env.ACCEPT_DB_PASS + process.env.ACCEPT_DB_HOST;
            return config;
        case 'production':
            config.db.connectString = process.env.DB_PREFIX + process.env.PROD_DB_USER + ':' + process.env.PROD_DB_PASS + process.env.PROD_DB_HOST;
            return config;
        case 'development':
            return config;
        case 'test':
            config.db.connectString = process.env.DB_PREFIX + process.env.TEST_DB_USER + ':' + process.env.TEST_DB_PASS + process.env.TEST_DB_HOST;
            return config;

    }
};
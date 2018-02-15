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
        case 'development':
            return config;
        case 'test':
            config.db.connectString = process.env.DB_PREFIX + process.env.TEST_DB_USER + ':' + process.env.TEST_DB_PASS + process.env.TEST_DB_HOST;
            return config;

    }
};
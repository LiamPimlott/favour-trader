const config = {
    env: process.env.NODE_ENV,
    debug: process.env.DEBUG,
    db: {
        prefix: process.env.DB_PREFIX,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        host: process.env.DB_HOST,
        connectString: process.env.DB_PREFIX + process.env.DB_USER + ':' + process.env.DB_PASS + process.env.DB_HOST,
        seedDB: process.env.DB_SEED
    },
    jwt: {
        secret: process.env.JWT_SECRET
    }
};

module.exports = config;
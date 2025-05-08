const config = require('config');

module.exports.libConfig= {
    port: config.get('PORT') || 3000,

    /**
     * Rest API config
     */
    api: {
        prefix: '/api/v1'
    },

    /**
     * Switch routes on/off
     */
    routes: {
        default: true,
        auth: true,
        user: true,
        service: true,
        servicePhoto: true,
    },

    mongo: {
        protocol: config.get('MONGO_PROTOCOL'),
        database: config.get('MONGO_DB_NAME'),
        host: config.get('MONGO_DB_HOST'),
        url: config.get('MONGO_URL')
    }

};

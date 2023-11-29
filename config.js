const config = require('./package.json').projectConfig

module.exports = {
    mongoConfig: {
        connectionUrl: config.mongoConnectionUrl,//"192.168.1.15",
        database: 'food_db',
        collections: {
            USERS: 'users'
        }
    },
    serverConfig: {
        ip: config.serverIp,
        port: config.serverPort
    },
    tokenSecret: 'Bảo mật'
}
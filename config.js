const config = require('./package.json').projectConfig

module.exports = {
    mongoConfig: {
        connectionUrl: config.mongoConnectionUrl,
        database: 'food_db',
        collections: {
            USERS: 'users',
            RESTAURANT: 'restaurants',
            CARTS: 'carts',
            FOODS: 'foods',
            LOVES: 'favorites',
            ORDER: 'orders'
        }
    },
    serverConfig: {
        ip: config.serverIp,
        port: config.serverPort
    },
    tokenSecret: 'Bảo mật'
}
const config = require('./package.json').projectConfig

module.exports = {
    mongoConfig: {
        connectionUrl: config.mongoConnectionUrl,//"192.168.1.15",
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
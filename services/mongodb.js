const { MongoClient, ServerApiVersion } = require("mongodb");
const {mongoConfig} = require("../config");

class MongoDB {
    static connecToMongoDB = () => {
        MongoClient.connect(mongoConfig.connectionUrl)
        .then((connection) => {
                console.log('Đã kết nối với MongoDB')
                this.db = connection.db(mongoConfig.database)
            })
        .catch((error) => console.log(`Kết  nối thất bại: ${error}`));
    }
}

MongoDB.db = null;

module.exports = MongoDB;
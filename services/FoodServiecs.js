const { mongoConfig } = require("../config");
const MongoDB = require("../services/mongodb");

const getFoodBy1Id =  async (foodId) => {
    try {
        let food = await MongoDB.db
            .collection(mongoConfig.collections.FOODS)
            .findOne({id: foodId})
        if (food) {
            return {
                status: true,
                message:'Tìm thấy food thành công',
                data: food
            }
        } else {
            return {
                status: false,
                message: 'Không tìm thấy food nào cả'
            }
        }
    } catch (error) {
        return {
            status: false,
            message: 'Lỗi khi tìm kiếm food',
            error: `Lỗi khi tìm kiếm food: ${error?.message}`
        }
    }
}

module.exports = {getFoodBy1Id}
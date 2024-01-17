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

const getFoodByNameAndCategory = async (foodName) => {
    console.log(foodName);
    try {
        let foods = await MongoDB.db
            .collection(mongoConfig.collections.FOODS)
            .find({
                $or: [
                    { name: { $regex: foodName, $options: 'i' } },
                    { category: { $regex: foodName, $options: 'i' } }
                ]
            }).toArray();
        if (foods.length > 0) {
            return {
                status: true,
                message: 'Tìm thấy món ăn thành công',
                data: foods
            }
        } else {
            return {
                status: false,
                message: 'Không tìm thấy món ăn nào'
            }
        }
    } catch (error) {
        return {
            status: false,
            message: 'Lỗi khi tìm kiếm món ăn',
            error: `Lỗi khi tìm kiếm món ăn: ${error?.message}`
        }
    }
}

module.exports = {getFoodBy1Id, getFoodByNameAndCategory}
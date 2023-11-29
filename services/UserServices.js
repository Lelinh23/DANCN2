const { mongoConfig } = require("../config");
const MongoDB = require("../services/mongodb");

const getUserData = async (email) =>{
    try {
        let userObject = await MongoDB.db
            .collection(mongoConfig.collections.USERS)
            .findOne({ email });

        if (userObject) {
            return {
                status: true,
                message:'Lấy thông tin người dùng thành công',
                data: userObject
            }
        } else {
            return {
                status: false,
                message: 'Không tìm thấy người dùng'
            }
        }
    } catch (error) {
        return {
            status: false,
            message: 'Lỗi khi tìm kiếm người dùng',
            error: `Lỗi khi tìm kiếm người dùng: ${error?.message}`
        }
    }
}

module.exports = { getUserData }
const { mongoConfig } = require("../config");
const { getCartItems } = require("./CartServiecs");
const MongoDB = require("./mongodb");

const datHang = async ({ email, address }) => {
    try {
        // Lấy thông tin giỏ hàng
        let cartResponse = await getCartItems({ email });
        
        if (!cartResponse.status) {
            return cartResponse;
        }

        // Tạo đơn hàng mới .map(item => item.food)
        let newOrder = {
            email: email,
            address: address?.address,
            don_hang: cartResponse.data.cartItems.map(item => ({
                email: item.email,
                foodId: item.foodId,
                count: item.count
            })),
            metaData: cartResponse.data.metaData,
            status: "Đang chờ xử lý", // Trạng thái đơn hàng
            createdAt: new Date(), // Thời gian tạo đơn hàng`   
        };

        let result = await MongoDB.db
            .collection(mongoConfig.collections.ORDER)
            .insertOne(newOrder);

        if (result.insertedId) {
            // Xóa giỏ hàng sau khi đặt hàng thành công
            await MongoDB.db
                .collection(mongoConfig.collections.CARTS)
                .deleteMany({ email });

            return {
                status: true,
                message: "Đặt hàng thành công",
                data: newOrder,
            };
        } else {
            return {
                status: false,
                message: "Đặt hàng thất bại rồi",
            };
        }
    } catch (error) {
        return {
            status: false,
            message: "Không thể đặt hàng",
            error: error.message, // Thêm thông tin về lỗi
        };
    }
};

const getAllOrder =  async ( email ) => {
    try {
        let donhang = await MongoDB.db
            .collection(mongoConfig.collections.ORDER)
            .aggregate([
                {
                    $match: {
                        email: email,
                    },
                },{
                    $lookup: {
                        from: "foods",
                        localField: "don_hang.foodId",
                        foreignField: "id",
                        as: "food",
                    },
                }
            ]).toArray();

        if (donhang?.length > 0) {
            return {
                status: true,
                message:'Tìm thấy đơn thành công',
                data: donhang
            }
        } else {
            return {
                status: false,
                message: 'Không tìm thấy đơn hàng nào cả'
            }
        }
    } catch (error) {
        return {
            status: false,
            message: 'Lỗi khi tìm kiếm đơn hàng',
            error: `Lỗi khi tìm kiếm đơn hàng: ${error?.message}`
        }
    }
}
module.exports = { datHang, getAllOrder }
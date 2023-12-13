const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb");

const addYeuThich = async ({ IdNhaHang, email }) => {
    try {
        let insertLove = await MongoDB.db
            .collection(mongoConfig.collections.LOVES)
            .insertOne({ IdNhaHang, email });

        if (insertLove.insertedId) {
            let loveResponse = await getYeuThich({email})
            return {
                status: true,
                message: "Thêm vào mục yêu thích thành công",
                data: loveResponse?.data
            };
        }
    } catch (error) {
        return {
            status: false,
            message: "Thêm vào mục yêu thích thất bại",
        };
    }
};

const xoaYeuThich = async ({ IdNhaHang, email }) => {
    try {
        let xoaLove = await MongoDB.db
            .collection(mongoConfig.collections.LOVES)
            .deleteOne({ IdNhaHang, email });

        if (xoaLove?.deletedCount > 0) {
            let loveResponse = await getYeuThich({email})
            return {
                status: true,
                message: "Xoá ra mục yêu thích thành công",
                data: loveResponse?.data
            };
        }
    } catch (error) {
        return {
            status: false,
            message: "Xoá ra mục yêu thích thất bại",
        };
    }
};

const getYeuThich = async ({ email }) => {
    try {
        let love = await MongoDB.db
            .collection(mongoConfig.collections.LOVES)
            .aggregate([
                {
                    $match: {
                        email: email,
                    },
                },{
                    $lookup: {
                        from: "restaurants",
                        localField: "IdNhaHang",
                        foreignField: "id",
                        as: "restaurant",
                    },
                  },
                  {
                    $unwind: {
                      path: "$restaurant",
                    },
                },
            ]).toArray();

        if (love?.length > 0) {
            return {
                status: true,
                message: "Lấy thông tin nhà hàng love thành công",
                data: love
            };
        } else {
            return {
                status: false,
                message: "Không thấy mục love",
            };
        }
    } catch (error) {
        return {
            status: false,
            message: "Lấy thông tin nhà hàng love thất bại",
        };
    }
};

module.exports = { addYeuThich, xoaYeuThich, getYeuThich }

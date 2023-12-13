const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb");

const addToCart = async ({ foodId, email }) => {
    try {
        let updatedCart = await MongoDB.db
            .collection(mongoConfig.collections.CARTS)
            .updateOne(
                { foodId, email },
                { $inc: { count: 1 } },
                { upsert: true }
            );

        if (updatedCart?.modifiedCount > 0 || updatedCart?.upsertedCount > 0) {
            let cartResponse = await getCartItems({email})
            return {
                status: true,
                message: "Thêm vào giỏ thành công",
                data: cartResponse?.data
            };
        }
    } catch (error) {
        return {
            status: false,
            message: "Thêm vào giỏ thất bại",
        };
    }
};

const XoaKhoiCart = async ({ foodId, email }) => {
    try {
        let cart = await MongoDB.db
            .collection(mongoConfig.collections.CARTS)
            .findOne({foodId, email, count: 1})

        if (cart) {
            await MongoDB.db.collection(mongoConfig.collections.CARTS).deleteOne({foodId, email});
            let cartResponse = await getCartItems({email})
            return {
                status: true,
                message: "Xoá sản phẩm trong giỏ thành công",
                data: cartResponse?.data
            }
        }
        let updatedCart = await MongoDB.db
            .collection(mongoConfig.collections.CARTS)
            .updateOne(
                { foodId, email },
                { $inc: { count: -1 } },
                { upsert: true }
            );

        if (updatedCart?.modifiedCount > 0 || updatedCart?.upsertedCount > 0) {
            let cartResponse = await getCartItems({email})
            return {
                status: true,
                message: "Đã xoá sản phẩm trong giỏ thành công",
                data: cartResponse?.data
            };
        }
    } catch (error) {
        return {
            status: false,
            message: "Xoá sản phẩm trong giỏ thất bại",
        };
    }
};

const getCartItems = async ({ email }) => {
    try {
        let cartItems = await MongoDB.db
            .collection(mongoConfig.collections.CARTS)
            .aggregate([
                {
                    $match: {
                        email: email,
                    },
                },{
                    $lookup: {
                        from: "foods",
                        localField: "foodId",
                        foreignField: "id",
                        as: "food",
                    },
                },{
                    $unwind: {
                        path: "$food",
                    },
                },
            ]).toArray();

        if (cartItems?.length > 0) {

            let itemTotal = cartItems?.map(cartItems => cartItems?.food?.price * cartItems?.count)
                                     ?.reduce((a,b) => parseFloat(a) + parseFloat(b));
            let monTotal = cartItems.map(item => item.count).reduce((a, b) => a + b, 0);
            let giamGia = 10;
            return {
                status: true,
                message: "Lấy thông tin sản phẩm trong giỏ hàng thành công",
                data: {cartItems, metaData: {
                    itemTotal,
                    giamGia,
                    monTotal,
                    tongCong: itemTotal - giamGia,
                    }
                }
            };
        }
    } catch (error) {
        return {
            status: false,
            message: "Lấy thông tin sản phẩm trong giỏ hàng thất bại",
        };
    }
};

module.exports = { addToCart, XoaKhoiCart, getCartItems }

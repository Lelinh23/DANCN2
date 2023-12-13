import { SERVER_API } from "../helpers/ApiConstants";
import axios from "axios";
import { authHeader } from "../helpers/Chung";
import { getToken } from "../Redux/Store/Store";

const getCartItem = async () => {
    console.log('CartService | getCartItem');
    try {
        let response = await axios.get(
            `${SERVER_API.BASE_API_URL}${SERVER_API.CART}`, {
                headers: authHeader(getToken())
            }
        );
        
        if (response?.status === 200){
            return {
                status: true,
                message: 'Dữ liệu gio hàng đã được lấy',
                data: response?.data?.data
            }
        } else {
            return {
                status: false,
                message: `Không được tìm thấy dữ liệu gio hàng`,
            }
        }
    } catch (error) {
        return {
            status: false,
            message: `Dữ liệu nhà gio không được tìm thấy`,
        }
    }
}

const addToCart = async (foodId: any) => {
    console.log('CartService | addToCart |' );
    try {
        let response = await axios.post(
            `${SERVER_API.BASE_API_URL}${SERVER_API.CART}/${foodId}`,
            {}, 
            {
                headers: authHeader(getToken())
            }
        );

        if (response?.status === 200){
            return {
                status: true,
                message: 'Sản phẩm đã được thêm',
                data: response?.data?.data
            }
        } else {
            return {
                status: false,
                message: `Sản phẩm chưa được thêm`,
            }
        }
    } catch (error) {
        return {
            status: false,
            message: `Sản phẩm chưa được thêm`,
        }
    }
}

const XoaFromCart = async (foodId: any) => {
    console.log('CartService | XoaFromCart |');
    try {
        let response = await axios.delete(
            `${SERVER_API.BASE_API_URL}${SERVER_API.CART}/${foodId}`, {
                headers: authHeader(getToken())
            }
        );

        if (response?.status === 200){
            return {
                status: true,
                message: 'Sản phẩm đã được xoá',
                data: response?.data?.data
            }
        } else {
            return {
                status: false,
                message: `Sản phẩm chưa được xoá`,
            }
        }
    } catch (error) {
        return {
            status: false,
            message: `Sản phẩm chưa được xoá`,
        }
    }
}

export {getCartItem, addToCart, XoaFromCart}
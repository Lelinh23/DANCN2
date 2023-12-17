// orderService.js
import { SERVER_API } from "../helpers/ApiConstants";
import axios from "axios";
import { authHeader } from "../helpers/Chung";
import { getToken } from "../Redux/Store/Store";

const placeOrder = async (email: any, address: any) => {
    console.log('OrderService | placeOrder');
    try {
        let response = await axios.post(
            `${SERVER_API.BASE_API_URL}${SERVER_API.ORDER}`,
            { email, address },
            {
                headers: authHeader(getToken())
            }
        );

        if (response?.status === 200){
            return {
                status: true,
                message: 'Đặt hàng thành công',
                data: response?.data?.data
            }
        } else {
            return {
                status: false,
                message: `Đặt hàng thất bại`,
            }
        }
    } catch (error) {
        return {
            status: false,
            message: `Không thể đặt hàng`,
        }
    }
}

const getAllOrder = async (email: any) => {
    console.log('OrderService | getAllOrder |', email);
    try {
        let orderResponse = await axios.get(
            `${SERVER_API.BASE_API_URL}${SERVER_API.ORDER}/${email}`, {
                headers: authHeader(getToken())
            }
        );
        console.log('sser', orderResponse.data)

        if (orderResponse?.status === 200){
            return {
                status: true,
                message: 'Dữ liệu món ăn đã được lấy',
                data: orderResponse?.data
            }
        } else {
            return {
                status: false,
                message: `Không được tìm thấy dữ liệu món ăn`,
            }
        }
    } catch (error) {
        return {
            status: false,
            message: `Dữ liệu món ăn không được tìm thấy`,
        }
    }
}

export { placeOrder, getAllOrder }

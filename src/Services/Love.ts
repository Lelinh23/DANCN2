import { SERVER_API } from "../helpers/ApiConstants";
import axios from "axios";
import { authHeader } from "../helpers/Chung";
import { getToken } from "../Redux/Store/Store";

const getYeuThich = async () => {
    console.log('LoveService | getYeuThich');
    try {
        let response = await axios.get(
            `${SERVER_API.BASE_API_URL}${SERVER_API.LOVE}`, {
                headers: authHeader(getToken())
            }
        );

        if (response?.status === 200){
            return {
                status: true,
                message: 'Dữ liệu cửa hàng yêu thích đã được lấy',
                data: response?.data?.data
            }
        } else {
            return {
                status: false,
                message: `Không tìm thấy dữ liệu của cửa hàng yêu thích`,
            }
        }
    } catch (error) {
        return {
            status: false,
            message: `Dữ liệu cửa hàng yêu thích tìm không thấy`,
        }
    }
}

const addYeuThich = async (IdNhaHang: any) => {
    console.log('LoveService | addYeuThich' );
    try {
        let response = await axios.post(
            `${SERVER_API.BASE_API_URL}${SERVER_API.LOVE}/${IdNhaHang}`,
            {}, 
            {
                headers: authHeader(getToken())
            }
        );

        if (response?.status === 200){
            return {
                status: true,
                message: 'Đã thêm thành cửa hàng yêu thích',
                data: response?.data?.data
            }
        } else {
            return {
                status: false,
                message: `Chưa thêm thành cửa hàng yêu thích`,
            }
        }
    } catch (error) {
        return {
            status: false,
            message: `Không thể thành cửa hàng yêu thích được`,
        }
    }
}

const xoaKhoiLove = async (IdNhaHang: any) => {
    console.log('LoveService | xoaKhoiLove |');
    try {
        let response = await axios.delete(
            `${SERVER_API.BASE_API_URL}${SERVER_API.LOVE}/${IdNhaHang}`, {
                headers: authHeader(getToken())
            }
        );

        if (response?.status === 200){
            return {
                status: true,
                message: 'Cửa hàng yêu thích đã được xoá',
                data: response?.data?.data
            }
        } else {
            return {
                status: false,
                message: `Cửa hàng yêu thích chưa được xoá`,
            }
        }
    } catch (error) {
        return {
            status: false,
            message: `Không xoá cửa hàng yêu thích này được`,
        }
    }
}

export { getYeuThich, addYeuThich, xoaKhoiLove }
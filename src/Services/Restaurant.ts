import { SERVER_API } from "../helpers/ApiConstants";
import axios from "axios";
import { authHeader } from "../helpers/Chung";
import { getToken } from "../Redux/Store/Store";

export const getNhaHang = async () => {
    console.log('NhaHanService | getNhaHang');
    try {
        let nhahangResponse = await axios.get(
            `${SERVER_API.BASE_API_URL}${SERVER_API.RESTAURANT}`, {
                headers: authHeader(getToken())
            }
        );

        if (nhahangResponse?.status === 200){
            return {
                status: true,
                message: 'Dữ liệu nhà hàng đã được lấy',
                data: nhahangResponse?.data?.data
            }
        } else {
            return {
                status: false,
                message: `Không được tìm thấy dữ liệu nhà hàng`,
            }
        }
    } catch (error) {
        return {
            status: false,
            message: `Dữ liệu nhà hàng không được tìm thấy`,
        }
    }
}

export const getNhaHangTheo1Id = async (IdNhaHang: any) => {
    console.log('NhaHangService | getNhaHangTheo1Id |', IdNhaHang);
    try {
        let nhahangResponse = await axios.get(
            `${SERVER_API.BASE_API_URL}${SERVER_API.RESTAURANT}/${IdNhaHang}`, {
                headers: authHeader(getToken())
            }
        );

        if (nhahangResponse?.status === 200){
            return {
                status: true,
                message: 'Dữ liệu nhà hàng đã được lấy',
                data: nhahangResponse?.data?.data
            }
        } else {
            return {
                status: false,
                message: `Không được tìm thấy dữ liệu nhà hàng`,
            }
        }
    } catch (error) {
        return {
            status: false,
            message: `Dữ liệu nhà hàng không được tìm thấy`,
        }
    }
}

export const searchNhaHangTheoTen = async (searchText: any) => {
    console.log('NhaHangService | searchNhaHangTheoTen |', searchText);
    try {
        let tim = {
            searchText: searchText
        };

        let nhahangResponse = await axios.post(
            `${SERVER_API.BASE_API_URL}${SERVER_API.RESTAURANT}/search/tim`, tim,
            {
                headers: authHeader(getToken())
            }
        );

        if (nhahangResponse?.status === 200) {
            return {
                status: true,
                message: 'Dữ liệu nhà hàng đã được lấy',
                data: nhahangResponse?.data
            }
        } else {
            return {
                status: false,
                message: `Không được tìm thấy dữ liệu nhà hàng`,
            }
        }
    } catch (error) {
        console.error('Error during searchNhaHangTheoTen:', error);
        return {
            status: false,
            message: `Đã xảy ra lỗi khi tìm kiếm nhà hàng`,
        }
    }
}

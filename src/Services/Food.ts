import axios from "axios";
import { SERVER_API } from "../helpers/ApiConstants";
import { authHeader } from "../helpers/Chung";
import { getToken } from "../Redux/Store/Store";

export const getFoodTheo1Id = async (foodId: any) => {
    console.log('FoodService | getFoodTheo1Id');
    try {
        let foodResponse = await axios.get(
            `${SERVER_API.BASE_API_URL}${SERVER_API.FOOD}/${foodId}`, {
                headers: authHeader(getToken())
            }
        );

        if (foodResponse?.status === 200){
            return {
                status: true,
                message: 'Dữ liệu món ăn đã được lấy',
                data: foodResponse?.data?.data
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

export const getFoodByNameAndCategory = async (foodName: any) => {
    console.log('FoodService | getFoodByNameAndCategory', foodName);
    try {

        let tim = {
            foodName:foodName
        };

        let foodResponse = await axios.post(
            `${SERVER_API.BASE_API_URL}${SERVER_API.FOOD}/foods/danhmuc`, tim, 
            {
                headers: authHeader(getToken())
            }
        );

        if (foodResponse?.status === 200){
            return {
                status: true,
                message: 'Dữ liệu món ăn đã được lấy',
                data: foodResponse?.data?.data
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
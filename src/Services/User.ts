import { SERVER_API } from "../helpers/ApiConstants";
import axios from "axios";
import { authHeader } from "../helpers/Chung";
import { getToken } from "../Redux/Store/Store";

export const getUserData = async () => {
    console.log('UserService | getUserData');
    try {
        let userResponse = await axios.get(
            `${SERVER_API.BASE_API_URL}${SERVER_API.USER}/get-user`, {
                headers: authHeader(getToken())
            }
        );

        if (userResponse?.status === 200){
            return {
                status: true,
                message: 'Dữ liệu người dùng đã được lấy',
                data: userResponse?.data
            }
        } else {
            return {
                status: false,
                message: `Dữ liệu người dùng không được tìm thấy`,
            }
        }
    } catch (error) {
        return {
            status: false,
            message: `Dữ liệu người dùng không được tìm thấy`,
        }
    }
}
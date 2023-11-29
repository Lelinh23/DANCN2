import axios from "axios";
import * as ApiConstants from "../helpers/ApiConstants";
import { authHeader } from "../helpers/Chung";
import { getToken } from "../Redux/Store/Store";

const AuthRequest = axios.create({
    baseURL: ApiConstants.SERVER_API.BASE_API_URL
})

const register = async (user: { username: any; email: any; password: any; }) => {

    if (!user?.username || !user?.email || !user?.password) {
        return{
            status: false,
            message: "Không được để trống mục nào cả"
        }
    }
    try {
        let requestBody = {
            username: user?.username,
            email: user?.email,
            password: user?.password
        };

        let registerResponse = await AuthRequest.post(
            ApiConstants.SERVER_API.REGISTER, 
            requestBody,);
        
        return registerResponse?.data
    } catch (error) {
        console.log(error)
        return{
            status: false,
            message: "Ối! Đã xảy ra lỗi"
        }
    }
};

const login = async (user: { email: any; password: any; }) => {

    if ( !user?.email || !user?.password) {
        return{
            status: false,
            message: "Không được để trống mục nào cả"
        }
    }
    try {
        let requestBody = {
            email: user?.email,
            password: user?.password
        };

        let loginResponse = await AuthRequest.post(
            ApiConstants.SERVER_API.LOGIN, 
            requestBody,);
        
        return loginResponse?.data
    } catch (error) {
        console.log(error)
        return{
            status: false,
            message: "Ối! Đã xảy ra lỗi"
        }
    }
};

const checkuserExist = async (type: any, value: any) => {

    try {
        let params = {[type]: value}

        let userCheckResponse = await AuthRequest.get(
            ApiConstants.SERVER_API.USER_EXIST, 
            {params});
        console.log(userCheckResponse?.data);
        return userCheckResponse?.data
    } catch (error) {
        console.log(error)
        return{
            status: false,
            message: "Ối! Đã xảy ra lỗi"
        }
    }
};

const capnhatToken = async () => {

    try {
        let tokenResponse = await AuthRequest.get(
            ApiConstants.SERVER_API.REFRESH_TOKEN, 
            {headers: authHeader(getToken())});

        if (tokenResponse?.status === 200) {
            return {
                status: true,
                data: tokenResponse?.data
            }
        } else {
            return {
                status: false
            }
        }
    } catch (error) {
        console.log(error)
        return{
            status: false,
            message: "Ối! Đã xảy ra lỗi"
        }
    }
};

export {register, login, checkuserExist, capnhatToken};
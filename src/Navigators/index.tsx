import React, {useEffect}from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from "../helpers/constants";

import SplashPage from '../Pages/SplashScreen/SplashScreen';
import HomePage from "../Pages/Home/HomePage";
import LoginPage from "../Pages/Login/LoginPage";
import RegisterPage from "../Pages/Register/RegisterPage";
import ForgotPasswordPage from "../Pages/ForgotPass/ForgotPassword";
import RegisterPhonePage from "../Pages/Register/RegisterPhonePage";
import VerificationPage from "../Pages/Register/VerificationPage";

import { useAppSelector, useAppDispatch } from '../Redux/app/hooks'
import { ActionTypes, appStart } from "../Redux/Actions/HanhDongChung";
import GioiThieuPage from "../Pages/GioiThieu/GioiThieuPage";
import RestaurantPage from "../Pages/Restaurant/RestaurantPage";

const Stack = createNativeStackNavigator()

const Navigation = () => {
    const {isAppLoading, token, isLanDauUse} = useAppSelector(state => state?.QuanLyChung);
    console.log('token:', token);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch<any>(appStart());
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                {isAppLoading ? (
                            <Stack.Screen name={SCREENS.SPLASH} component={SplashPage} />
                    ) :!token ?  (
                        <>
                        {isLanDauUse && (
                            <Stack.Screen name={SCREENS.HI} component={GioiThieuPage}/>
                        )}
                            <Stack.Screen name={SCREENS.LOGIN} component={LoginPage} />
                            <Stack.Screen name={SCREENS.REGISTER} component={RegisterPage} />
                            <Stack.Screen name={SCREENS.FORGOTPASS} component={ForgotPasswordPage} />
                            <Stack.Screen name={SCREENS.REGSDT} component={RegisterPhonePage} />
                            <Stack.Screen name={SCREENS.OTP} component={VerificationPage} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name={SCREENS.HOME} component={HomePage} />
                            <Stack.Screen name={SCREENS.RESTAURANT} component={RestaurantPage} />
                        </>
                    )
                }
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}
 
export default Navigation;

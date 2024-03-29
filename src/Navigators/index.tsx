import React, {useEffect}from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREENS } from "../helpers/constants";

import SplashPage from '../Pages/SplashScreen/SplashScreen';
import HomTabs from "./BottomTab";
import LoginPage from "../Pages/Login/LoginPage";
import RegisterPage from "../Pages/Register/RegisterPage";
import ForgotPasswordPage from "../Pages/ForgotPass/ForgotPassword";
import RegisterPhonePage from "../Pages/Register/RegisterPhonePage";
import VerificationPage from "../Pages/Register/VerificationPage";

import { useAppSelector, useAppDispatch } from '../Redux/app/hooks'
import { ActionTypes, appStart } from "../Redux/Actions/HanhDongChung";
import GioiThieuPage from "../Pages/GioiThieu/GioiThieuPage";
import { RestaurantPage } from "../Pages/Restaurant/RestaurantPage";
import FoodPage from "../Pages/Food/FoodPage";
import { CartPage } from "../Pages/Cart/CartPage";
import AccountPage from "../Pages/Account/AccountPage";
import LovePage from "../Pages/Love/LovePage";
import AllOrderPage from "../Pages/Order/AllOrderPage";
import { PayOrderPage } from "../Pages/Order/PayOrderPage";
import { AllowOrderPage } from "../Pages/Order/AlllowOrder";
import TrackOrderPage from "../Pages/Order/TrackOrderPage";
import KetQuaSearchPage from "../Pages/Search/KetQuaSearchPage";
import HomePage from "../Pages/Home/HomePage";
import CategoryPage from "../Pages/Category/CategoryPage";

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
                        <Stack.Screen name={SCREENS.HI} component={GioiThieuPage} />
                    ) :!token ?  (
                        <>
                        {isLanDauUse && (
                            <Stack.Screen name={SCREENS.SPLASH} component={SplashPage} />
                        )}
                            <Stack.Screen name={SCREENS.LOGIN} component={LoginPage} />
                            <Stack.Screen name={SCREENS.REGISTER} component={RegisterPage} />
                            <Stack.Screen name={SCREENS.FORGOTPASS} component={ForgotPasswordPage} />
                            <Stack.Screen name={SCREENS.REGSDT} component={RegisterPhonePage} />
                            <Stack.Screen name={SCREENS.OTP} component={VerificationPage} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name={SCREENS.HOME} component= {HomTabs} />
                            <Stack.Screen name={SCREENS.RESTAURANT} component={RestaurantPage} />
                            <Stack.Screen name={SCREENS.FOOD} component={FoodPage} />
                            <Stack.Screen name={SCREENS.CART} component={CartPage} />
                            <Stack.Screen name={SCREENS.LOVE} component={LovePage} />
                            <Stack.Screen name={SCREENS.ACCOUNT} component={AccountPage}/>
                            <Stack.Screen name={SCREENS.ORDER} component={AllOrderPage}/>
                            <Stack.Screen name={SCREENS.PAY_ORDER} component={PayOrderPage}/>
                            <Stack.Screen name={SCREENS.ALLOW_ORDER} component={AllowOrderPage}/>
                            <Stack.Screen name={SCREENS.TRACK_ORDER} component={TrackOrderPage}/>
                            <Stack.Screen name={SCREENS.SEARCH_RESULT} component={KetQuaSearchPage}/>
                            <Stack.Screen name={SCREENS.CATEGORY} component={CategoryPage}/>
                        </>
                    )
                }
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}
 
export default Navigation;

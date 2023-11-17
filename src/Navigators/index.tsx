import React from "react";
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

const Stack = createNativeStackNavigator()

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={SCREENS.SPLASH}>
                <Stack.Screen name={SCREENS.SPLASH} component={SplashPage} />
                <Stack.Screen name={SCREENS.LOGIN} component={LoginPage} />
                <Stack.Screen name={SCREENS.REGISTER} component={RegisterPage} />
                <Stack.Screen name={SCREENS.FORGOTPASS} component={ForgotPasswordPage} />
                <Stack.Screen name={SCREENS.REGSDT} component={RegisterPhonePage} />
                <Stack.Screen name={SCREENS.OTP} component={VerificationPage} />
                <Stack.Screen name={SCREENS.HOME} component={HomePage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
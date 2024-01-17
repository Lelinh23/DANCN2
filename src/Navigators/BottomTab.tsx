import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import HomePage from '../Pages/Home/HomePage';
import { CartPage } from '../Pages/Cart/CartPage';
import { Colors } from '../assets/colors';
import LovePage from '../Pages/Love/LovePage';
import AccountPage from '../Pages/Account/AccountPage';

const Tab = createMaterialBottomTabNavigator();

export default () => {
    return (
        <Tab.Navigator 
            activeColor= {Colors.mau_icon}
            inactiveColor= {Colors.gray}
            barStyle={{ backgroundColor: Colors.white, height: 75 }}
            shifting={true}
            >

            <Tab.Screen name='TRANG CHỦ' component={HomePage} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={26} color= { color } style={{}}/>
                    ),
                }}/>

            <Tab.Screen name='YÊU THÍCH' component={LovePage} 
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="favorite-border" size={26} color= { color } style={{}}/>
                    ),
                }}/>

            <Tab.Screen name='GIỎ HÀNG' component={CartPage}
                options={{
                    tabBarIcon: ({ color }) => (
                    <Ionicons name="shopping-cart-checkout" size={26} color= { color } style={{}}/>
                    ),
                }}/>

            <Tab.Screen name='TÀI KHOẢN' component={AccountPage}
                options={{
                    tabBarIcon: ({ color }) => (
                    <Ionicons name="person" size={26} color= { color } style={{}}/>
                    ),
                }}/>

        </Tab.Navigator>
    );
}
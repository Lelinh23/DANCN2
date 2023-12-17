import React, { useEffect, useState } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/colors";
import LottieView from "lottie-react-native";
import { Images } from "../../assets/images";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getAllOrder } from "../../Services/Order";
import { SCREENS } from "../../helpers/constants";


const AllowOrderPage = ({route}: {route: any}) => {
    const navigation: any = useNavigation();
    const { newOrderData } = route.params;

    return (
        <View style={{ flex: 1, marginTop: 24 }}>
            <StatusBar
                barStyle="light-content" 
                backgroundColor={Colors.nen}
                translucent/>
            <View style={styles.container}>
                <View style={styles.groupHearder}>
                    <Ionicons name="arrow-back" size={30} style={styles.iconBack} 
                              onPress={() => navigation.goBack()}/>
                </View>
                <View style={styles.ViewNotItem}>
                    <LottieView source={Images.SUSSED} style={styles.lottie} autoPlay/>
                    <Text style={styles.txtNo}>Đơn hàng: {newOrderData?.status}</Text>
                    <Text style={styles.txtLuot}>Chi tiết đơn hàng ở dưới</Text>
                    <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => navigation.navigate(SCREENS.ORDER, { email: newOrderData?.email })}>
                        <Text style={styles.txtK}>Tất cả đơn hàng!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
)}
export { AllowOrderPage }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.nen,
        paddingTop: 10
    },
    groupHearder:{
        marginHorizontal: 25,
        flexDirection: 'row',
        width: '100%',
        marginTop: 10
    },
    txtMuc:{
        fontSize: 25,
        marginLeft: 100,
        width: '90%',
        alignItems: 'center',
        color: Colors.white
    },
    iconBack:{
        width: '10%',
        color: Colors.white
    },
    ViewNotItem:{
        alignItems: 'center',
    },
    lottie:{
        width: 300,
        height: 300
    },
    txtNo:{
        fontSize: 20,
        color: Colors.white,
        fontWeight: 'bold',
    },
    txtLuot:{
        fontSize: 20,
        color: Colors.gray,
        fontStyle: 'italic'
    },
    addButton:{
        padding: 5,
        marginTop: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.mau_icon
    },
    txtK:{
        fontSize: 20,
        color: Colors.mau_chu_2,
        margin: 5
    }
})
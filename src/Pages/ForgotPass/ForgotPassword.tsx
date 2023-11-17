import React, { useState } from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/colors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREENS } from "../../helpers/constants";
import { Images } from "../../assets/images";

const ForgotPasswordPage = ({navigation}: {navigation: any}) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, marginTop: '13%' }}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={Colors.white}
                translucent
            />
            <Icon name="arrow-back-ios" size={30} style={styles.iconBack}  onPress={() => navigation.goBack()} />

            <View style={styles.formGourp}>
                <Image source={Images.FORGOT} resizeMode="contain" style={styles.image} />
                <Text style={styles.txtQMK}>QUÊN MẬT KHẨU</Text>
            </View>

            <View style={styles.GroupE}>
                <Icon name="email" size={30} style={styles.icon} />
                <TextInput placeholder="Email" style={styles.formLabel} />
            </View>

            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
export default ForgotPasswordPage
const styles = StyleSheet.create({
    iconBack: {
        color: Colors.nen,
        padding: 10,
        borderColor: Colors.nen,
        borderRadius: 1,
        marginLeft: '5%'
    },
    image: {
        height: '250%',
        width: '45%',
    },
    formGourp: {
        flexDirection: 'row',
        marginLeft: '25%',
    },
    txtQMK: {
        fontSize: 30,
        color: Colors.nen,
        lineHeight: 40 * 1.2,
        fontWeight: 'bold',
        width: '30%',
        fontStyle: 'italic',
    },
    GroupE: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '50%',
        borderWidth: 3,
        borderColor: Colors.nen,
        borderRadius: 20,
        marginHorizontal: '10%',
    },
    icon: {
        color: Colors.nen,
        padding: 10,
        borderColor: Colors.nen,
        borderRadius: 1,
    },
    formLabel: {
        flex: 1,
        fontWeight: '600',
        fontStyle: 'italic',
        color: Colors.black,
        fontSize: 16,
    },
    button:{
        backgroundColor: Colors.nen,
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center', 
        width: '85%',
        marginTop: '10%'
    },
    buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    }
});
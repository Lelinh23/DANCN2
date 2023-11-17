import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, Image, Text, TextInput, Button, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from "../../assets/colors";
import { SCREENS } from "../../helpers/constants";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const LoginPage = ({navigation}: {navigation: any}) => {   
    const [isHienPass, setHienPass] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.nen, marginTop: '13%' }}>
            <View style={styles.header}>
                <Text style={styles.TillerHeader }> ĐĂNG NHẬP </Text>
            </View>
            <View style={ styles.noidung}>
                <Text style={styles.tittelWel}> Welcome Back </Text>
                <Text style={styles.tiielLog}> Đăng nhập vào tài khoản của bạn </Text>

                <View style={styles.formGroup}>
                    <Icon name="email" size={30} style={styles.icon}/>
                    <TextInput placeholder="Email" style={styles.formLabel} />
                </View>

                <View style={styles.formGroup}>
                    <Icon name="lock" size={30} style={styles.icon}/>
                    <TextInput placeholder="Password" style={styles.formLabel} 
                               secureTextEntry={isHienPass ? false: true}/>
                    <Ionicons name={isHienPass ? 'eye' : 'eye-off'} size={30} style={styles.icon} onPress={() => setHienPass(!isHienPass)}/>
                </View>

                <View style={styles.NhoorQuen}>
                    <BouncyCheckbox style={styles.Nho} 
                        size={25}
                        fillColor= "#30b9b2"
                        text="Ghi nhớ"
                        textStyle={{ textDecorationLine: "none" }}
                        innerIconStyle={{ borderRadius: 10, borderWidth: 2}}/>
                    <TouchableOpacity style={styles.fPass}>
                        <Text style={styles.textFPass} onPress={() => navigation.navigate(SCREENS.FORGOTPASS)}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ alignItems: 'center', backgroundColor: Colors.white }}>
                <View style={styles.buttonLog}>
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.indexLogin}>
                    <Text style={styles.DacoAcc}>Bạn chưa có tài khoản? </Text>
                    <TouchableOpacity >
                        <Text style={styles.sigin} onPress={() => navigation.navigate(SCREENS.REGISTER)}>Đăng ký tại đây</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginPage;

const styles = StyleSheet.create({
    header: {
        marginTop:'10%',
        paddingHorizontal: "5%",
        alignItems: 'center',
        marginBottom: '5%'
    },
    TillerHeader:{
        fontSize:30,
        textAlign: 'center',
        color: Colors.lightWhite,
        lineHeight: 35,
        fontWeight:'bold',
    },
    tittelWel: {
        fontSize: 40, 
        color: Colors.black, 
        fontWeight: 'bold',
        marginTop: '10%',
    },
    noidung: {
        backgroundColor: 'white',
        height:'70%',
        width: '100%',
        borderTopLeftRadius: 130,
        paddingTop: '10%',
        alignItems: 'center',
    },
    tiielLog:{
        color: 'grey',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: '15%',
    },
    formGroup: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 3,
        borderColor: Colors.nen, // Border color
        borderRadius: 20, 
    },
    icon: {
        color: Colors.nen,
        padding:10,
        borderColor: Colors.nen, // Border color
        borderRadius: 1,
    },
    formLabel: {
        flex: 1,
        fontWeight: '600',
        fontStyle: 'italic',
        color: '#757575',
        fontSize: 16,
        paddingHorizontal: 15,
    },
    fPass:{
        paddingRight: 16, 
    },
    textFPass:{
        color: Colors.nen, 
        fontWeight: 'bold', 
        fontSize: 16,
    },
    buttonLog:{
        borderRadius: 10,
        width: '90%',
        margin: '3%',
    },
    button:{
        backgroundColor: Colors.nen,
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    indexLogin: {
        flexDirection: 'row',
        alignItems: 'center', 
        backgroundColor: Colors.white,
        marginBottom:'15%',
    },
    DacoAcc:{
        fontSize: 16, 
        fontWeight:"bold"
    },
    sigin:{
        color: Colors.nen, 
        fontWeight: 'bold', 
        fontSize: 16
    },
    NhoorQuen:{
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    Nho: {
        paddingRight: '30%',
    }
})

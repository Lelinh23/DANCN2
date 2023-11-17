import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/colors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREENS } from "../../helpers/constants";

const RegisterPage = ({navigation}: {navigation: any}) => {
    const [isHienPass, setHienPass] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.nen, marginTop: '13%' }}>
            <View style={styles.header}>
                <Text style={styles.TillerHeader}> ĐĂNG KÝ </Text>
                <Text style={styles.txtNewAcc}> Tạo một tài khoản mới </Text>
            </View>
            <View style={ styles.noidung}>

                <Ionicons name="fast-food" size={60} style={[styles.icon, {marginBottom: '10%'}]} />

                <View style={styles.formGroup}>
                    <Icon name="person" size={30} style={styles.icon}/>
                    <TextInput placeholder="Username" style={styles.formLabel} keyboardType='email-address'/>
                </View>

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

                <View style={styles.buttonSig}>
                    <TouchableOpacity style={styles.button} >
                        <Text style={styles.btText} onPress={() => navigation.navigate(SCREENS.REGSDT)}>TẠO TÀI KHOẢN</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.indexSig}>
                    <Text style={styles.DacoAcc}>Bạn đã có tài khoản? </Text>
                    <TouchableOpacity >
                        <Text style={styles.login} onPress={() => navigation.navigate(SCREENS.LOGIN)}>Đăng nhập tại đây</Text>
                    </TouchableOpacity>
                </View>
            </View>
    </SafeAreaView>
    )
}
export default RegisterPage

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
    txtNewAcc:{
        fontSize:16,
        textAlign: 'center',
        color: Colors.lightWhite,
        lineHeight: 20,
    },
    noidung: {
        backgroundColor: 'white',
        height:'85%',
        width: '100%',
        borderTopLeftRadius: 130,
        paddingTop: '10%',
        alignItems: 'center',
    },
    formGroup: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 3,
        marginBottom: 20,
        borderColor: Colors.nen, // Border color
        borderRadius: 20, 
    },
    icon: {
        color: Colors.nen,
        paddingHorizontal: 10,
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
    buttonSig: {
        marginTop: '24%',
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
    btText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    indexSig: {
        flexDirection: 'row',
        alignItems: 'center', 
        backgroundColor: Colors.white,
        marginBottom:'15%',
    },
    DacoAcc:{
        fontSize: 16, 
        fontWeight:"bold"
    },
    login: {
        color: Colors.nen, 
        fontWeight: 'bold', 
        fontSize: 16
    }
})
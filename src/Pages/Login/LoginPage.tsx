import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from "../../assets/colors";
import { SCREENS } from "../../helpers/constants";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { login } from "../../Services/XacThuc";
import LottieView from "lottie-react-native";
import { Images } from "../../assets/images";
import { connect, useDispatch } from "react-redux";
import { setIsAppLoading, setToken, ActionTypes } from "../../Redux/Actions/HanhDongChung";
import { useNavigation } from "@react-navigation/native";
import { setToken as settoken } from "../../Services/Storage";

const LoginPage = () => {  
    const navigation: any = useNavigation();

    const dispatch = useDispatch(); 
    
    const [isHienPass, setHienPass] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const DangNhap =async () => {
        setIsLoading(true);

        let user = {
            email, password
        }

        login(user).then(async response => {
            setIsLoading(false);
            if (response?.status) {
                await settoken(response?.data);
                dispatch(setToken(response?.data));
            } else {
                setErrorMessage(response?.message);
            }
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.nen, marginTop: 18}}>
            <View style={styles.header}>
                <Text style={styles.TillerHeader}> ĐĂNG NHẬP </Text>
            </View>
            <View style={ styles.noidung}>
                <Text style={styles.tittelWel}> Welcome Back </Text>
                <Text style={styles.tiielLog}> Đăng nhập vào tài khoản của bạn </Text>

                <Text style={styles.loiMess}>{errorMessage}</Text>

                <View style={styles.formGroup}>
                    <Icon name="email" size={30} style={styles.icon}/>
                    <TextInput placeholder="Email" style={styles.formLabel}
                    onChangeText={(text) => setEmail(text)} />
                </View>

                <View style={styles.formGroup}>
                    <Icon name="lock" size={30} style={styles.icon}/>
                    <TextInput placeholder="Password" style={styles.formLabel} 
                               secureTextEntry={isHienPass ? false: true}
                               onChangeText={(text) => setPassword(text)}/>
                    <Ionicons name={isHienPass ? 'eye' : 'eye-off'} size={30} style={styles.icon} 
                    onPress={() => setHienPass(!isHienPass)}/>
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
                    <TouchableOpacity style={styles.button} onPress={() => DangNhap()}>
                    {isLoading ? 
                    (<LottieView style={styles.lottie} source={Images.LOADING} autoPlay />)
                                                        :
                    (<Text style={styles.buttonText}>ĐĂNG NHẬP</Text>)
                    }
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

// const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: any; }) => any) => {
//     return {
//        setToken: (token: any) => dispatch(setToken(token)),
//     };
// };

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
        marginBottom: '10%',
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
    },
    loiMess:{
        fontSize: 16,
        lineHeight: 18,
        color: Colors.red,
        marginBottom: 20
    },
    lottie:{
        width: '100%', 
        height: '100%', 
        position:'relative',
    },
})

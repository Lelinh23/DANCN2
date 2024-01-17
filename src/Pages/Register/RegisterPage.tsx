import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/colors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREENS } from "../../helpers/constants";
import { register, checkuserExist } from "../../Services/XacThuc"
import LottieView from "lottie-react-native";
import { Images } from "../../assets/images";
import { useNavigation } from "@react-navigation/native";

const RegisterPage = () => {
    const navigation: any = useNavigation();

    const [isHienPass, setHienPass] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [usernameErrMess, setUsernameErrMess] = useState('');
    const [emailErrMess, setEmailErrMess] = useState('');

    // xử lý việc đăng ký
    const dangky = () =>{
        //khởi tạo Đối Tượng Người Dùng
        let user = {
            username,
            email,
            password
        };
        console.log(user);
        setIsLoading(true)
        // gửi yêu cầu đăng ký đến máy chủ 
        register(user).then(response => {
            setIsLoading(false)
            console.log(response);
            if (!response?.status) {
                setErrorMessage(response?.message)
            }
        });
    }

    // xử lý 
    const checkUserExist = async (type: any, value: any ) => {
        if (value?.length > 0) {
            checkuserExist(type, value).then(response => {
                if (response?.status) {
                    type === 'email' && emailErrMess ? setEmailErrMess('') : null;
                    type === 'username' && usernameErrMess ? setUsernameErrMess('') : null;
                } else {
                    type === 'email' ? setEmailErrMess(response?.message) : null;
                    type === 'username' ? setUsernameErrMess(response?.message) : null;
                }
            })
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.nen,  marginTop: 18}}>
            <View style={styles.header}>
                <Text style={styles.TillerHeader}> ĐĂNG KÝ </Text>
                <Text style={styles.txtNewAcc}> Tạo một tài khoản mới </Text>
            </View>
            <View style={ styles.noidung}>
                
                <Ionicons name="fast-food" size={60} style={[styles.icon, {marginBottom: '10%'}]} />

                <View style={styles.formGroup}>
                    <Icon name="person" size={30} style={styles.icon}/>
                    <TextInput placeholder="Username" style={styles.formLabel}
                            onChangeText={(text) => setUsername(text)}
                            onEndEditing={({nativeEvent: {text}}) => checkUserExist('username', text)}/>
                </View>

                <Text style={styles.loitemail}>{usernameErrMess}</Text>

                <View style={styles.formGroup}>
                    <Icon name="email" size={30} style={styles.icon}/>
                    <TextInput placeholder="Email" style={styles.formLabel} keyboardType='email-address'
                            onChangeText={(text) => setEmail(text)}
                            onEndEditing={({nativeEvent: {text}}) => checkUserExist('email', text)}/>
                </View>

                <Text style={styles.loitemail}>{emailErrMess}</Text>

                <View style={styles.formGroup}>
                    <Icon name="lock" size={30} style={styles.icon}/>
                    <TextInput placeholder="Password" style={styles.formLabel} 
                               secureTextEntry={isHienPass ? false: true}
                               onChangeText={(text) => setPassword(text)}/>
                    <Ionicons name={isHienPass ? 'eye' : 'eye-off'} size={30} style={styles.icon} onPress={() => setHienPass(!isHienPass)}/>
                </View>
                
                <Text style={styles.loiMess}>{errorMessage}</Text>

                <View style={styles.buttonSig}>  
                    <TouchableOpacity style={styles.button} onPress={() => {
                        dangky(); 
                        navigation.navigate(SCREENS.REGSDT)
                    }}>
                    {isLoading ? 
                    (<LottieView style={styles.lottie} source={Images.LOADING} autoPlay />)
                                                        :
                    (<Text style={styles.btText}>ĐĂNG KÝ</Text>)
                    }     
                    </TouchableOpacity>

                    <View style={styles.indexSig}>
                        <Text style={styles.DacoAcc}>Bạn đã có tài khoản? </Text>
                        <TouchableOpacity>
                            <Text style={styles.login} onPress={() => navigation.navigate(SCREENS.LOGIN)}>Đăng nhập tại đây</Text>
                        </TouchableOpacity>
                    </View>
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
        width: '90%',
        height: '10%',
        marginTop: '10%'
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
        justifyContent: 'center'
    },
    DacoAcc:{
        fontSize: 16, 
        fontWeight:"bold"
    },
    login: {
        color: Colors.nen, 
        fontWeight: 'bold', 
        fontSize: 16
    },
    loiMess:{
        fontSize: 16,
        lineHeight: 18,
        color: Colors.red,
    },
    lottie:{
        width: '100%', 
        height: '100%', 
        position:'relative',
    },
    loitemail:{
        fontSize: 14,
        lineHeight: 18,
        color: Colors.red,
        marginBottom: '2%',
    },
})
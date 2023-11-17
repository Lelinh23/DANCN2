import React, { useRef, useState } from "react";
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Colors } from "../../assets/colors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SCREENS } from "../../helpers/constants";
import Navigation from "../../Navigators";

const VerificationPage = ({ route }: { route: any }) => {
    const { params } = route;
    const phoneNumber = params?.phoneNumber;
    const navigation: any = useNavigation();

    const MotInput = useRef<TextInput>(null)
    const HaiInput = useRef<TextInput>(null)
    const BaInput = useRef<TextInput>(null)
    const BonInput = useRef<TextInput>(null)
    const [otp, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});
    return (
        <SafeAreaView style={styles.container}>

            <Icon name="arrow-back-ios" size={30} style={styles.iconBack} onPress={() => navigation.goBack()} />

            <View style={styles.noidung}>
                <Icon name="sms" size={150} style={styles.iconBack}/>
                <Text style={styles.txtOTP}>XÁC NHẬN OTP</Text>
                <Text style={styles.txtSo}>Vui lòng nhập mã OTP gồm 4 chữ số đã được gửi đến số {' '}
                <Text style={styles.txtSDT}>{phoneNumber}</Text></Text>

                <View style={styles.GroupOTP}>

                    <View style={styles.otpBox}>
                        <TextInput style={styles.otpText} keyboardType='number-pad' maxLength={1}
                                   ref={MotInput} 
                                   onChangeText={text => {
                                    setOtp({...otp, 1: text});
                                    text && HaiInput.current!.focus();
                                  }}/>
                    </View>

                    <View style={styles.otpBox}>
                        <TextInput style={styles.otpText} keyboardType='number-pad' maxLength={1}
                                    ref={HaiInput}
                                    onChangeText={text => {
                                        setOtp({...otp, 2: text});
                                        text ? BaInput.current!.focus() : MotInput.current!.focus();
                                      }}/>
                    </View>

                    <View style={styles.otpBox}>
                        <TextInput style={styles.otpText} keyboardType='number-pad' maxLength={1}
                                    ref={BaInput}
                                    onChangeText={text => {
                                        setOtp({...otp, 3: text});
                                        text ? BonInput.current!.focus() : HaiInput.current!.focus();
                                      }}/>
                    </View>

                    <View style={styles.otpBox}>
                        <TextInput style={styles.otpText} keyboardType='number-pad' maxLength={1}
                                    ref={BonInput}
                                    onChangeText={text => {
                                        setOtp({...otp, 4: text});
                                        !text && BaInput.current!.focus();
                                      }}/>
                    </View>
                </View>

                <View style={styles.GroupVer}>
                    <Text style={styles.txtHoi}>Bạn chưa nhận được OTP? </Text>
                    <TouchableOpacity >
                        <Text style={styles.resent} onPress={() => navigation.navigate(SCREENS.OTP, { phoneNumber } )}>Gửi lại</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.btVer}>
                    <TouchableOpacity style={styles.bt} onPress={() => console.log(otp)}>
                        <Text style={styles.btText} onPress={() => navigation.navigate(SCREENS.HOME)}>XÁC NHẬN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default VerificationPage;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: Colors.white, 
        marginTop: '13%'
    },
    iconBack: {
        color: Colors.nen,
        padding: 10,
        borderColor: Colors.nen,
        borderRadius: 8,
        marginLeft: "5%",
    },
    noidung: {
        alignItems: 'center'
    },
    txtOTP:{
        fontSize: 30,
        color: Colors.nen,
        lineHeight: 40 * 1.2,
        fontWeight: 'bold',
    },
    txtSo: {
        fontSize: 15,
        lineHeight: 20,
        width: '80%',
        textAlign: 'center'
    },
    txtSDT:{
        fontSize: 17,
        lineHeight: 18,
        color: Colors.red,
    },
    GroupOTP:{
        marginHorizontal: 20,
        marginBottom: 20,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    otpBox: {
        borderRadius: 5,
        borderColor: Colors.nen,
        borderWidth: 0.5,
        margin: '5%'
    },
    otpText: {
        fontSize: 25,
        color: Colors.black,
        textAlign: 'center',
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    btVer: {
        marginTop: '24%',
        borderRadius: 10,
        width: '90%',
        margin: '3%',
    },
    bt: {
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
    GroupVer:{
        flexDirection: 'row',
        alignItems: 'center', 
        backgroundColor: Colors.white,
        marginBottom:'15%',
    },
    txtHoi: {
        fontSize: 16
    },
    resent: {
        color: Colors.nen,  
        fontSize: 16
    }
});


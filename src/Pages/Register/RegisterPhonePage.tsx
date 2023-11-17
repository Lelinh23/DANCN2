import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/colors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SCREENS } from "../../helpers/constants";
import { getCoIcon } from '../../Services/StaticImageService';
import { Country } from "../../assets/countrycode";
import { CoItem } from "../../Components/CoItem";

const RegisterPhonePage = ({navigation}: {navigation: any}) => {

    const getDropdownStyle = (y: number) => ({...styles.DoNuoc, top: y + 55 });

    const [ChonQuocGia, setChonQuocGia] = useState(Country.find(country => country.name === 'Viet Nam'));
    const [inputsNươcY, setInputsNuocY] = useState(0);
    const [isMoDropdown, setIsMoDropdown] = useState(false);
    const [dropdownLayout, setDropdownLayout] = useState({});
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, marginTop: '13%' }}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={Colors.white}
                translucent
            />
            <Icon name="arrow-back-ios" size={30} style={styles.iconBack}  onPress={() => navigation.goBack()} />
            <View style={styles.container}>
                <Icon name="phone-in-talk" size={150} style={styles.iconBack} />
                <Text style={styles.txtSDT}>ĐĂNG KÝ SỐ ĐIỆN THOẠI</Text>
            </View>

            <View style={styles.GroupNhapSDT}
                  onLayout={({nativeEvent: {layout: {y}}}) => setInputsNuocY(y)}>
                <TouchableOpacity style={styles.listQuocGia} onPress={() => setIsMoDropdown(!isMoDropdown)}>
                    <Image source={{uri: getCoIcon(ChonQuocGia?.code) }} style={styles.flatIcon}/>
                    <Text style={styles.txtNuoc}>
                        {ChonQuocGia?.dial_code}
                    </Text>
                    <Icon name="arrow-drop-down" size={25}/>
                </TouchableOpacity>
                <View style={styles.inputPhone}>
                    <TextInput 
                    placeholder="Nhập số điện thoại" 
                    keyboardType= 'number-pad'
                    style={styles.inputText}
                    onChangeText={(text) => setPhoneNumber(ChonQuocGia?.dial_code + text)}/>
                </View>
            </View>

            <View style={styles.buttonSig}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate(SCREENS.OTP, { phoneNumber })}>
                    <Text style={styles.btText}>ĐĂNG KÝ</Text>
                </TouchableOpacity>
            </View>

            { isMoDropdown && (
                <View style={getDropdownStyle(inputsNươcY)}
                      onLayout={({
                                    nativeEvent: {
                                        layout: {x, y, height, width},
                                    },
                                }) => setDropdownLayout({x, y, height, width})}>
                    <FlatList
                        data={Country}
                        keyExtractor={item => item.code}
                        renderItem={({item}) => (
                            <CoItem
                                {...item}
                                onPress={(nuoc: any)=> {
                                    setChonQuocGia(nuoc);
                                    setIsMoDropdown(false);
                                }}
                            />
                        )}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};
export default RegisterPhonePage
const styles = StyleSheet.create({
    iconBack: {
        color: Colors.nen,
        padding: 10,
        borderColor: Colors.nen,
        borderRadius: 1,
        marginLeft: '5%'
    },
    container: {
        alignItems: 'center'
    },
    txtSDT:{
        fontSize: 30,
        color: Colors.nen,
        lineHeight: 40 * 1.2,
        fontWeight: 'bold',
    },
    GroupNhapSDT: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: '9%'
    },
    listQuocGia:{
        backgroundColor: Colors.mau_bt_sdt,
        width: '35%',
        marginRight: 5,
        borderRadius: 8,
        height: '95%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: Colors.mau_vien_bt_sdt,
        flexDirection: 'row'
    },
    inputPhone: {
        backgroundColor: Colors.mau_bt_sdt,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.mau_vien_bt_sdt,
        justifyContent: 'center',
        flex: 1
    },
    flatIcon: {
        marginHorizontal:'5%',
        height: '90%',
        width: '25%',
    },
    txtNuoc: {
        fontSize: 20,
        lineHeight: 20 * 1.4,
        color: Colors.black
    },
    inputText: {
        fontSize: 18,
        fontStyle: 'italic',
        textAlignVertical: 'center',
        color: Colors.black,
    },
    DoNuoc:{
        backgroundColor: Colors.red,
        position: 'absolute',
        width: '80%',
        height: '50%',
        marginLeft: 20,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: Colors.nen,
        zIndex: 3,
    },
    buttonSig: {
        marginTop: '15%',
        borderRadius: 10,
        alignItems: 'center'
    },
    button:{
        backgroundColor: Colors.nen,
        padding: 15,
        borderRadius: 20
    },
    btText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
});
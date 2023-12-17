import React, { useEffect, useState } from "react";
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from '../../assets/colors';
import { Images } from '../../assets/images';
import { SCREENS } from "../../helpers/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useAppDispatch } from "../../Redux/app/hooks";
import { setToken, setUserData } from "../../Redux/Actions/HanhDongChung";
import { setToken as settoken } from "../../Services/Storage";
import { getUserData } from "../../Services/User";

const AccountPage = () => {
    const navigation: any = useNavigation();
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<any>(null);
    
    useEffect(() => {
        getUserData().then(response => {
            console.log(response?.data);
            setUser(response?.data);
        })
    }, []);

    const logout = async () => {
        await settoken('');
        dispatch(setToken(''));
        dispatch(setUserData(null));
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={Colors.nen}
                    translucent
                />
                <View style={styles.mauTop} />
                <View style={styles.header}>
                    <Ionicons
                        name="chevron-back-outline"
                        size={30}
                        color={Colors.white}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.txtTitle}>TÀI KHOẢN</Text>
                    <View style={{width: 35, height: 30}}>
                        <Icon name="bell" size={30} color={Colors.white} />
                        <View style={styles.bell}>
                            <Text style={styles.txtBell}>12</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.GroupHoSo}>
                    <Image style={styles.anhAvata} source={Images.AVATAR} />
                    <View style={styles.groupTxtHoSo}>
                        <Text style={styles.txtName}>{user?.data?.username}</Text>
                        <Text style={styles.txtEmail}>{user?.data?.email}</Text>
                    </View>
                </View>
                <View style={styles.GroupMenu}>
                    <TouchableOpacity 
                        style={styles.menuItem} 
                        onPress={() => navigation.navigate(SCREENS.ORDER, { email: user?.data?.email })}>
                        <Icon
                            name="truck-fast"
                            size={30}
                            color={Colors.nen}
                        />
                        <Text style={styles.txtMenu}>Đơn Hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Icon
                            name="gift-outline"
                            size={30}
                            color={Colors.red}
                        />
                        <Text style={styles.txtMenu}>Kho Voucher</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            name="location-outline"
                            size={30}
                            color={Colors.mau_vien_bt_sdt}
                        />
                        <Text style={styles.txtMenu}>Địa chỉ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.GroupMain}>
                    <Text style={styles.txtTenMuc}>Tài khoản của tôi</Text>
                    <TouchableOpacity style={styles.groupMucNho}>
                        <View style={styles.groupMucnho}>
                            <Ionicons
                                name="person-outline"
                                size={20}
                                color={Colors.nen}
                            />
                            <Text style={styles.txtMucNho}>Hồ sơ</Text>
                        </View>
                        <Icon
                            name="chevron-right"
                            color={Colors.gray}
                            size={20}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.groupMucNho}>
                        <View style={styles.groupMucnho}>
                            <Ionicons
                            name="card-outline"
                            size={20}
                            color={Colors.nen}
                            />
                            <Text style={styles.txtMucNho}>Thẻ</Text>
                        </View>
                        <Icon
                            name="chevron-right"
                            color={Colors.gray}
                            size={20}
                        />
                    </TouchableOpacity>

                    <Text style={styles.txtTenMuc}>Thông báo</Text>
                        <View style={styles.groupMucNho} >
                            <View style={styles.groupMucnho}>
                                <Icon name="bell" size={18} color={Colors.nen} />
                                <Text style={styles.txtMucNho}>Thông báo</Text>
                            </View>
                            <BouncyCheckbox
                                size={18}
                                fillColor= "#30b9b2"
                                textStyle={{ textDecorationLine: "none" }}
                                innerIconStyle={{ borderRadius: 20, borderWidth: 2}}/>
                        </View>
                        <View style={styles.groupMucNho} >
                            <View style={styles.groupMucnho}>
                                <Icon name="bell" size={18} color={Colors.nen} />
                                <Text style={styles.txtMucNho}>Thông báo khuyến mãi & ưu đãi</Text>
                            </View>
                            <BouncyCheckbox
                                size={18}
                                fillColor= "#30b9b2"
                                textStyle={{ textDecorationLine: "none" }}
                                innerIconStyle={{ borderRadius: 20, borderWidth: 2}}/>
                        </View>

                    <Text style={styles.txtTenMuc}>Nhiều hơn</Text>
                    <View style={styles.groupMucNho}>
                        <View style={styles.groupMucnho}>
                            <Ionicons
                                name="color-palette"
                                size={20}
                                color={Colors.nen}
                            />
                            <Text style={styles.txtMucNho}>Dark Mode</Text>
                        </View>
                        <BouncyCheckbox
                            size={18}
                            fillColor= "#30b9b2"
                            textStyle={{ textDecorationLine: "none" }}
                            innerIconStyle={{ borderRadius: 20, borderWidth: 2}}/>
                    </View>

                    <View style={styles.groupMucNho}>
                        <TouchableOpacity
                            style={styles.groupMucnho}
                            activeOpacity={0.8}
                            onPress={() => logout()}
                            >
                            <Icon
                                name="logout"
                                size={18}
                                color={Colors.nen}
                            />
                            <Text style={styles.txtMucNho}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
      },
      mauTop: {
        backgroundColor: Colors.nen,
        height: '28%',
        position: 'absolute',
        width: '100%',
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      txtTitle: {
        fontSize: 20,
        lineHeight: 25,
        color: Colors.white,
      },
      bell: {
        backgroundColor: Colors.mau_vien_bt_sdt,
        position: 'absolute',
        height: 20,
        width: 20,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        right: 0
      },
      txtBell: {
        fontSize: 12,
        lineHeight: 14,
        color: Colors.white,
      },
      GroupHoSo: {
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      },
      anhAvata: {
        width: 60,
        height: 60,
        borderRadius: 30,
      },
      groupTxtHoSo: {
        marginLeft: 10,
      },
      txtName: {
        fontSize: 25,
        lineHeight: 27,
        color: Colors.white,
      },
      txtEmail: {
        fontSize: 15,
        lineHeight: 16,
        color: Colors.white,
      },
      GroupMenu: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 20,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
      },
      menuItem: {
        flex: 1,
        alignItems: 'center',
      },
      txtMenu: {
        fontSize: 14,
        lineHeight: 15,
        color: Colors.black,
        textAlign: 'center',
        marginTop: 5,
      },
      GroupMain: {
        marginHorizontal: 20,
        marginTop: 10,
        backgroundColor: Colors.white,
        elevation: 3,
        paddingHorizontal: 20,
        borderRadius: 10,
        paddingBottom: 20,
      },
      txtTenMuc: {
        fontSize: 18,
        lineHeight: 20,
        color: Colors.black,
        marginTop: 25,
      },
      groupMucNho: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
      },
      groupMucnho: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      txtMucNho: {
        fontSize: 15,
        lineHeight: 16,
        color: Colors.gray,
        marginLeft: 10,
      },
});

export default AccountPage;

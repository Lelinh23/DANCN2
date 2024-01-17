import React, { useEffect, useState } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../assets/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppDispatch } from "../../Redux/app/hooks";
import { getUserData } from "../../Services/User";
import { SCREENS } from "../../helpers/constants";
import { useNavigation } from "@react-navigation/native";
import FoodCheckCart from "../../Components/FoodCheck";
import { OrderFood } from "../../Redux/Actions/OrderAction";


const PayOrderPage = ({route}: {route: any}) => {

    const { email, cartItems, cartMeta } = route.params;
    const navigation: any = useNavigation();
    const defaultAddress = "Điện Ngọc, Điện Bàn, Quảng Nam, Việt Nam";
    const [address, setAddress] = useState(defaultAddress);
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<any>(null);
    const [orderData, setOrderData] = useState(null); 
    
    
    useEffect(() => {
        getUserData().then(response => {    
            console.log(response?.data);
            setUser(response?.data);
        })
    }, []);

    const XacNhanDatDon = async () => {
        const newOrderData = await dispatch<any>(OrderFood(email, address));
        if (newOrderData) {
            setOrderData(newOrderData);
        } else {
            console.log('OrderFood không trả về dữ liệu');
        }
        navigation.navigate(SCREENS.ALLOW_ORDER, {newOrderData});
    };
    
    return (
        <ScrollView style={{marginTop: 18 }}>
            <View style={styles.orderSummary}>
                <Ionicons
                    name="chevron-back-outline"
                    size={30}
                    color={Colors.white}
                />
                <Text style={styles.txtTitle}>XÁC NHÂN ĐẶT HÀNG</Text>
                <View style={{width: 35, height: 30}}>
                    <Icon name="bell" size={30} color={Colors.white} />
                    <View style={styles.bell}>
                        <Text style={styles.txtBell}>12</Text>
                    </View>
                </View>
            </View>
            <View style={styles.GroupDiaChi}>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <Ionicons name="location" size={20} color={Colors.white}/>
                        <View>
                            <Text style={styles.txtLocation}> Địa chỉ giao hàng</Text>
                            <Text style={styles.txtLocation}>{user?.data?.username} | 093894823</Text>
                            <TextInput
                                onChangeText={setAddress}
                                value={address}
                                style={styles.txtLocation}
                                placeholder="Nhập địa chỉ giao hàng"
                            />
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={Colors.white}/>
                </View>
            </View>
            <View style={styles.GroupGiaoNow}>
                <View style={styles.row}>
                    <View style={styles.row}>
                        <Ionicons name="time-outline" size={20} color={Colors.white}/>
                        <View>
                            <Text style={styles.txtLocation}> Giao ngay bây giờ</Text>
                        </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={Colors.white}/>
                </View>
            </View>
            <View style={styles.foodList}>
                {cartItems?.map((item: any) => (
                    <FoodCheckCart 
                        {...item?.food }
                        key={item?.food?.id}
                        navigate={() => navigation.navigate(
                            SCREENS.FOOD,
                            {foodId: item?.food?.id}
                        )} />
                ))}
            </View>
            <View>
                <View style={styles.GrupTinhTien}>
                    <View style={styles.row}>
                        <Text style={styles.txtCong}>Tổng cộng ({cartMeta.monTotal} món)</Text>
                        <Text style={styles.txt}> 
                            {cartMeta.itemTotal?.toFixed(3)}đ
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.txtCong}>Voucher giảm giá</Text>
                        {cartMeta.giamGia > 0 ? (
                            <Text style={styles.txt}>
                                -{cartMeta.giamGia?.toFixed(3)}đ
                            </Text>
                        ): (
                            <Text style={styles.txt}>0đ</Text>
                        )}
                        
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.txtCong}>Phí giao hàng</Text>
                        <Text style={{...styles.txt, color: Colors.nen}}> Freeship </Text>
                    </View>
                </View>
                <View style={styles.groupTongThanhToan}>
                    <Text style={styles.txtTongThanhToan}>Tổng cộng</Text>
                    <Text style={styles.txtTongThanhToan}>
                        {cartMeta?.tongCong.toFixed(3)}đ
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={XacNhanDatDon}>
                <Text style={styles.btText}>Đặt đơn</Text>
            </TouchableOpacity>
    </ScrollView>
)}
export { PayOrderPage };

const styles = StyleSheet.create({
    orderSummary:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.nen,
        marginTop: 24,
        padding: 10
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
    GoupOrder:{
        backgroundColor: Colors.red,
        elevation: 3,
        marginHorizontal: 10,
        marginTop: 5,
        borderRadius: 10
    },
    GroupDiaChi:{
        backgroundColor: Colors.red,
        paddingHorizontal: 10,
        paddingTop: 10,
        elevation: 3,
        margin: 10
    },
    txtLocation:{
        fontSize: 15,
        color: Colors.white,
        marginBottom: 10
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    GroupGiaoNow:{
        backgroundColor: Colors.nen,
        paddingHorizontal: 10,
        paddingTop: 10,
        elevation: 3,
        marginHorizontal: 10
    },
    foodList:{
        marginHorizontal: 5
    },
    groupDiscount:{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
        paddingVertical: 15,
        marginTop: 10,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        padding: 10
    },
    rowDiscount:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtAdd:{
        fontSize: 15,
        lineHeight: 17,
        color: Colors.black,
        marginLeft: 10,
    },
    GrupTinhTien:{
        marginHorizontal: 5,
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        backgroundColor: Colors.white,
        paddingHorizontal: 10
    },
    row2:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 3,
        padding: 10
    },
    txtCong:{
        fontSize: 15,
        lineHeight: 17,
        color: Colors.nen,
    },
    txt:{
        fontSize: 15,
        lineHeight: 17,
        color: Colors.black,
    },
    groupTongThanhToan:{
        marginHorizontal: 5,
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        padding: 10
    },
    txtTongThanhToan:{
        fontSize: 20,
        lineHeight: 24,
        color: Colors.mau_icon,
    },
    button:{
        backgroundColor: Colors.nen,
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        margin: 10
    },
    btText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
})
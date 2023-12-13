import React, { useEffect } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from '../../assets/colors';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppDispatch, useAppSelector } from "../../Redux/app/hooks";
import { FoodCart } from "../../Components/FoodCart";
import { GetCartItem } from "../../Redux/Actions/CartAction";
import { Images } from "../../assets/images";
import LottieView from "lottie-react-native";
import { SCREENS } from "../../helpers/constants";

const CartPage = () => {

    const navigation: any = useNavigation();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch<any>(GetCartItem());
    }, []);

    const cart = useAppSelector(state => state?.cartState?.cart)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                barStyle="light-content" 
                backgroundColor={Colors.nen}
                translucent/>
            <View style={styles.container}>
                <View style={styles.groupHearder}>
                    <Ionicons name="arrow-back" size={30} style={styles.iconBack} 
                              onPress={() => navigation.goBack()}/>
                    <Text style={styles.txtMuc}>GIỎ HÀNG</Text>
                </View>
                { cart?.cartItems?.length > 0 ? (
                    <>
                        <ScrollView>
                            <View style={styles.foodList}>
                                {cart?.cartItems?.map((item: any) => (
                                    <FoodCart 
                                        {...item?.food }
                                        key={item?.food?.id}
                                        navigate={() => navigation.navigate(
                                            SCREENS.FOOD,
                                            {foodId: item?.id}
                                        )} />
                                ))}
                            </View>

                            <View style={styles.groupDiscount}>
                                <View style={styles.rowDiscount}>
                                    <Ionicons name="ticket" size={30} color={Colors.mau_icon} />
                                    <Text style={styles.txtAdd}>Thêm Voucher</Text>
                                </View>
                                <Ionicons
                                    name="chevron-forward-outline"
                                    size={20}
                                    color={Colors.black}
                                />
                            </View>

                            <View style={styles.GrupTinhTien}>

                                <View style={styles.row}>
                                    <Text style={styles.txtCong}>Tổng cộng ({cart?.metaData?.monTotal} món)</Text>
                                    <Text style={styles.txt}> 
                                        {cart?.metaData?.itemTotal?.toFixed(3)}đ
                                    </Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.txtCong}>Voucher giảm giá</Text>
                                    {cart?.metaData?.giamGia > 0 ? (
                                        <Text style={styles.txt}>
                                            -{cart?.metaData?.giamGia?.toFixed(3)}đ
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
                                {cart?.metaData?.tongCong?.toFixed(3)}đ
                                </Text>
                            </View>

                            <TouchableOpacity style={styles.checkoutButton}>
                                <Text style={styles.txtCheck}>Đặt đơn - {cart?.metaData?.tongCong?.toFixed(3)}đ</Text>
                            </TouchableOpacity>

                        </ScrollView>
                    </>
                ) : (
                    <View style={styles.ViewNotItem}>
                        <LottieView source={Images.CART_NO_ITEM} style={styles.lottie} autoPlay/>
                        <Text style={styles.txtNo}>"Hống" có gì trong giỏ hết</Text>
                        <Text style={styles.txtLuot}>Lướt app, lựa món ngon đi!</Text>
                        <TouchableOpacity style={styles.addButton}>
                            <Text style={styles.txtK}>Kiếm món ngay!</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.nen,
    },
    groupHearder:{
        marginHorizontal: 25,
        flexDirection: 'row',
        height: 40,
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
        backgroundColor: Colors.white
    },
    row:{
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
    checkoutButton:{
        backgroundColor: Colors.mau_icon,
        borderRadius: 10,
        height: 50,
        margin: 15,
        alignItems:'center',
        justifyContent: 'center',
    },
    txtCheck:{
        fontSize: 18,
        lineHeight: 20,
        color: Colors.white,
        marginLeft: 8,
    },
    ViewNotItem:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: 50
    },
    lottie:{
        width: 200,
        height: 200
    },
    txtNo:{
        marginTop: 30,
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
});

export {CartPage};

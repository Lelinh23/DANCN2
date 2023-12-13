import React, { useEffect, useState } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from '../../assets/colors';
import { Images } from '../../assets/images';
import { SCREENS } from "../../helpers/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getGallery } from "../../Services/StaticImageService";
import { STATIC_IMAGE } from "../../helpers/ApiConstants";
import { getFoodTheo1Id } from "../../Services/Food";
import Ionicons from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { useAppDispatch, useAppSelector } from "../../Redux/app/hooks";
import { AddToCart, GetCartItem, xoadFromCart } from "../../Redux/Actions/CartAction";
import Icons from "react-native-vector-icons/AntDesign";

const FoodPage = ({ route }: { route: any }) => {
    const navigation: any = useNavigation();
    const  { params: { foodId } } = route;

    const setStyle = (isActive: any) => isActive ? styles.txtBar : {...styles.txtBar, color: Colors.gray};

    const [food, setFood] = useState<any>(null);
    const [selectedBar, setSelectedBar] = useState('Chi tiết');

    useEffect(() => {
        getFoodTheo1Id(foodId).then(response => {
            console.log(response?.data);
            setFood(response?.data);
        });
    }, [foodId]);

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch<any>(GetCartItem());
    }, []);

    const itemCounts = useAppSelector(state =>
        state?.cartState?.cart?.cartItems?.find((item: any) => item?.foodId === foodId)?.count)

    const addToCart = (foodId: any) => dispatch<any>(AddToCart(foodId))
    const xoaRaCart = (foodId: any) => dispatch<any>(xoadFromCart(foodId))

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
            <Image source={{uri: getGallery(food?.image, STATIC_IMAGE.SIZE.SQUARE)}}
                    style={styles.image}
                    resizeMode= 'stretch' />

            <ScrollView style={styles.GroupTotal}>
                <View>
                    <View style={styles.gruopThongTin}>
                        <Text style={styles.txtTen}>{food?.name}</Text>
                        <Text style={styles.txtGia}>{food?.price?.toFixed(3)}đ</Text>
                    </View>
                    <View style={styles.guopReview}>
                        <View style={styles.row}>
                            <Ionicons name="star" size={20} color={Colors.mau_icon}/>
                            <Text style={styles.txt}> 4</Text>
                            <Text style={styles.txt}> (423 đánh giá)</Text>
                        </View>

                        <View style={styles.row}>
                            <LottieView style={styles.lottie} source={Images.DELIVELY} autoPlay/>
                            <Text style={styles.txt}>FREESHIP</Text>
                        </View>
                    </View>
                    <View style={styles.groupBar}>
                        <TouchableOpacity 
                            style={styles.btMenu} 
                            onPress={() => setSelectedBar('Chi tiết')}>
                            <Text style={setStyle(selectedBar === 'Chi tiết')}>Chi tiết</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.btMenu}
                            onPress={() => setSelectedBar('Đánh giá')}>
                            <Text style={setStyle(selectedBar === 'Đánh giá')}>Đánh giá</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.gruopDetail}>
                        {food?.description ? (
                            <>
                                <Text style={styles.detailHeader}>Mô tả món ăn: </Text>
                                <Text style={styles.detailContent}>{food?.description}</Text>
                            </>
                            ) : null}

                        {food?.ingredients ? (
                            <>
                                <Text style={styles.detailHeader}>Nguyên liệu gồm:</Text>
                                <Text style={styles.detailContent}>{food?.ingredients}</Text>
                            </>
                        ) : null}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.groupNut}>
                <View style={[styles.row, styles.groupCount]}>
                    <View style={styles.soluong}>
                        <Icons 
                            name='minuscircleo' size={35} color={Colors.red} 
                            onPress={()=> xoaRaCart(foodId)}/>
                    </View> 
                    <Text style={styles.txtCount}>{itemCounts ? itemCounts : 0}</Text>
                    <View style={styles.soluong}>
                        <Icons 
                            name='pluscircleo' size={35} color={Colors.red}
                            onPress={()=> addToCart(foodId)}/>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.btCart}
                    onPress={() => navigation.navigate(SCREENS.CART)}>
                    <Text style={styles.btGoCart}>Go to Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    image:{
        height: '50%',
        width: '100%',
        position: 'absolute',
    },
    GroupTotal:{
        backgroundColor: Colors.nen, 
        flex: 1, 
        marginTop: '75%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    gruopThongTin:{
        flexDirection: 'row',
        marginTop: '5%',
        maxHeight: 50, 
        marginHorizontal:  10,
        width: 380,
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    txtTen:{
        maxWidth: 280,
        marginRight: '5%',
        fontSize: 20,
        color: Colors.white
    },
    txtGia: {
        width: 100,
        fontSize: 20,
        color: Colors.mau_chu,
    },
    guopReview:{
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    txt: {
        fontSize: 15,
        color: Colors.white,
    },
    lottie:{
        width: 50, 
        height: 50, 
    },
    groupBar:{
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        borderColor: Colors.gray,
        justifyContent: 'space-evenly',
    },
    btMenu:{
        paddingVertical: 15,
        maxWidth: 100,
        alignItems: 'center',
    },
    txtBar:{
        fontSize: 18,
        lineHeight: 20,
        color: Colors.white,
    },
    gruopDetail:{
        paddingHorizontal: 20,
    },
    detailHeader: {
        fontSize: 16,
        lineHeight: 20,
        color: Colors.white,
        marginTop: 10,
        marginBottom: 2,
    },
    detailContent: {
    fontSize: 14,
    lineHeight: 16,
    color: Colors.mau_chu,
    textAlign: 'justify',
    },
    groupNut:{
        flexDirection: 'row',
        paddingBottom: 10,
        paddingTop:5, 
        backgroundColor: Colors.nen
    },
    groupCount:{
        padding: 10, 
        borderRadius: 10, 
        marginHorizontal: 10,
        backgroundColor: Colors.mau_vien_distance,
    },
    soluong:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 200,
        justifyContent: 'center',
    },
    txtCount:{
        color: Colors.black,
        fontSize: 20,
        lineHeight: 18,
        marginHorizontal: 12,
    },
    btCart:{
        paddingVertical: 8,
        backgroundColor: Colors.mau_chu, 
        padding: 10, 
        borderRadius: 10,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btGoCart:{
        fontSize: 25,
    }
    
});

export default FoodPage;

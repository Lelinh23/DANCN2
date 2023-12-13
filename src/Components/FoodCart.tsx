import React, { useEffect, useState } from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Colors } from '../assets/colors';
import { View } from 'react-native';
import { getGallery } from '../Services/StaticImageService';
import { STATIC_IMAGE } from '../helpers/ApiConstants';
import Icons from "react-native-vector-icons/AntDesign";
import { AddToCart, GetCartItem, xoadFromCart } from '../Redux/Actions/CartAction';
import { useAppSelector, useAppDispatch } from '../Redux/app/hooks'
import { getCartItem } from '../Services/Cart';
import { cartReducer } from '../Redux/Reducers/Cart';

interface FoodCartProps {
    name: any;
    id: any;
    image: any;
    description: any;
    price: any;
    time: any;
    navigate: any;
}

const FoodCart: React.FC<FoodCartProps> = ({id, name, description, price, image, navigate}) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch<any>(GetCartItem());
    }, []);

    const itemCounts = useAppSelector(state =>
        state?.cartState?.cart?.cartItems?.find((item: any) => item?.foodId === id)?.count)

    const addToCart = (foodId: any) => dispatch<any>(AddToCart(foodId))
    const xoaRaCart = (foodId: any) => dispatch<any>(xoadFromCart(foodId))

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigate()}>
                <Image
                    style={styles.image}  resizeMode='stretch'
                    source={{ uri: getGallery(image, STATIC_IMAGE.SIZE.SQUARE)}}/>
            </TouchableOpacity>
            <View style={styles.GroupNoiDung}>
                <TouchableOpacity onPress={() => navigate()}>
                    <Text numberOfLines={1} style={styles.Ten}>
                        {name}
                    </Text>
                    <Text numberOfLines={2} style={styles.txtDescription}>
                        {description}
                    </Text>
                </TouchableOpacity>
                <View style={styles.grourpFood}>
                    <Text style={styles.txtPrice}>{price.toFixed(3)}đ</Text>
                    <View style={{flexDirection: 'row'}}>
                        {itemCounts > 0 ? (
                           <>
                                <View style={styles.soluong}>
                                    <Icons 
                                        name='minuscircleo' size={20} color={Colors.red} 
                                        onPress={()=> xoaRaCart(id)}/>
                                </View> 
                                <Text style={styles.txtCount}>{itemCounts}</Text>
                            </>
                        ) : null}
                        <View style={styles.soluong}>
                            <Icons 
                                name='pluscircleo' size={20} color={Colors.red}
                                onPress={()=> addToCart(id)}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
export { FoodCart };
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 10,
        elevation: 2,
        backgroundColor: Colors.lightWhite,
    },
    image: {
        height: 100,
        width: 100,
        margin: 6,
        borderRadius: 8,
    },
    GroupNoiDung: {
        marginHorizontal: 5
    },
    Ten:{
        width: 250,
        color: Colors.black,
        fontSize: 15,
        lineHeight: 18,
        marginBottom: 8,
    },
    txtDescription:{
        width: 250,
        height: 30,
        color: Colors.gray,
        fontSize: 12,
        lineHeight: 14,
        marginBottom: 8,
    },
    grourpFood:{
        flexDirection: 'row',
        alignItems: 'center',
        width: 250,
        justifyContent: 'space-between'
    },
    txtPrice:{
        color: Colors.mau_chu,
        fontSize: 18,
        lineHeight: 20,
        fontWeight: '900'
    },
    soluong:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.gray2,
        borderRadius: 200,
        justifyContent: 'center'
    },
    txtCount:{
        color: Colors.black,
        fontSize: 14,
        lineHeight: 18,
        marginHorizontal: 8,
    }

})
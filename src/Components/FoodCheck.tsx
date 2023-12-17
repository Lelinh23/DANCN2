// FoodCheckCart.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAppSelector } from '../Redux/app/hooks';
import { Colors } from '../assets/colors';
import { STATIC_IMAGE } from '../helpers/ApiConstants';
import { getGallery } from '../Services/StaticImageService';

interface FoodCheckCartProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description: any;
  navigate: () => void;
}

const FoodCheckCart: React.FC<FoodCheckCartProps> = ({ id, name, price, image, navigate , description}) => {
    const itemCounts = useAppSelector(state =>
        state?.cartState?.cart?.cartItems?.find((item: any) => item?.foodId === id)?.count)
  return (
    <TouchableOpacity onPress={navigate}>
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
                    <Text style={styles.txtCount}>x{itemCounts}</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
  );
};

export default FoodCheckCart;

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

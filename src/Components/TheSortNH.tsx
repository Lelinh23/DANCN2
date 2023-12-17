import React, { useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Colors } from '../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { getLogo, getPoster } from '../Services/StaticImageService';
import Ionicons from "react-native-vector-icons/MaterialIcons";
import { useAppDispatch, useAppSelector } from '../Redux/app/hooks';
import { AddYeuThich, GetLove, XoaKhoiLove } from '../Redux/Actions/LoveAction';

interface SortNHCardProps {
    name: any;
    id: any;
    images: {
      logo: any;
    };
    tags: any;
    distance: any;
    time: any;
  }

const SortNHCard: React.FC<SortNHCardProps> = ({name, id, images: { logo }, tags, distance, time}) => {
    const navigation = useNavigation();

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch<any>(GetLove());
    }, []);

    const isLove = useAppSelector(state =>
        state?.loveState?.love?.filter((item: any) => item?.IdNhaHang === id)?.length > 0)

    const addYeuThich = () => dispatch<any>(AddYeuThich(id))
    const xoaKhoiLove = () => dispatch<any>(XoaKhoiLove(id))

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.phan}>
                <View style={styles.Vimage}>
                    <Image 
                        source={{uri: getLogo(logo)}}
                        style={styles.image}
                        resizeMode= 'stretch'/>
                </View>
                <View style={styles.Pnoidung}>
                    <View style={styles.Vten}>
                        <Text style={styles.txtTen}>{name}</Text>      
                    </View>
                    <View style={styles.Vsao}>
                        <Ionicons name='star' size={20} color={Colors.mau_icon}/>
                        <Text style={styles.txt}>5</Text>
                        <Text style={styles.txt}> | {distance}m</Text>
                        <Text style={styles.txt}> | {time} phút</Text>
                    </View>
                </View>
                <View style={styles.Vicon}>
                    <Ionicons name='favorite-border' size={20} color={Colors.red}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.nen,
        marginVertical: 10,
    },
    phan: {
        flexDirection: 'row',
    },
    image: {
        flex: 1,
        height: '100%'
    },
    Vimage: {
        width: '30%',
    },
    Pnoidung: {
        width: '60%',
        marginTop: 5,
        marginLeft: '2%'
    },
    Vicon:{
        width: '5%',
        marginRight: '5%',
        marginTop: '2%'
    }, 
    Vten:{
        height: 50  
    },
    txtTen: {
        fontSize: 20,
        color: Colors.mau_chu
    },
    Vsao:{
        height: 25,
        flexDirection: 'row',
        marginVertical: 5
    },
    txt: {
        paddingLeft: 2,
        color: Colors.white
    }
})
export {SortNHCard}
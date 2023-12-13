import React, { useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Colors } from '../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { getPoster } from '../Services/StaticImageService';
import Ionicons from "react-native-vector-icons/MaterialIcons";
import { useAppDispatch, useAppSelector } from '../Redux/app/hooks';
import { AddYeuThich, GetLove, XoaKhoiLove } from '../Redux/Actions/LoveAction';
import Icons from "react-native-vector-icons/AntDesign";

interface LoveProps {
    name: any;
    id: any;
    images: {
      poster: any;
    };
    location: any;
    distance: any;
    time: any;
    tags: any;
    navigate: any
  }

const LoveCard: React.FC<LoveProps> = ({name, id, navigate, images, location, tags, distance, time}) => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    const xoaKhoiLove = () => dispatch<any>(XoaKhoiLove(id))
    return (
        <TouchableOpacity style={styles.container}>
            <Ionicons
                name="close"
                color={Colors.gray}
                size={22}
                style={styles.remomveIcon}
                onPress={() => xoaKhoiLove()}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigate(id)}>
                <Image
                    source={{uri: getPoster(images?.poster)}}
                    style={styles.poster}
                />
            </TouchableOpacity>

            <View style={styles.noidung}>
                <Text style={styles.txtName}>{name}</Text>
                <View style={[styles.row, {height: 15, alignItems: 'center'}]}>
                    <Ionicons name="location-pin" size={10} color={Colors.gray} />
                    <Text style={styles.txtdiachi}>{location}</Text>
                </View>
                <View style={[styles.row, {height: 20, alignItems: 'center'}]}>
                    <Icons name='tags' size={10} color={Colors.gray}/>
                    <Text style={styles.txtTag}> {tags?.slice(0, 3).join(' - ')}</Text>
                </View>
                <View style={styles.GroupS}>
                    <View style={styles.txtDanhgia}>
                        <Ionicons name='star' size={20} color={Colors.mau_icon}/>
                        <Text style={styles.txt}>4</Text>
                    </View>

                    <View style={styles.row}>
                        <Ionicons name='access-time' size={20} color={Colors.mau_chu_2}/>
                        <Text style={styles.txt}> {time}phút</Text>
                    </View>

                    <View style={styles.row}>
                        <Ionicons name='location-pin' size={20} color={Colors.mau_chu_2}/>
                        <Text style={styles.txt}>{distance}m</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        flexDirection: 'row',
    },
    remomveIcon:{
        position: 'absolute',
        right: 5
    },
    poster:{
        width: 80,
        height: 80,
        borderRadius: 10,
        margin: 5,
    },
    noidung: {
        flex: 1,
        paddingHorizontal: 10,
    },
    txtName: {
        fontSize: 15,
        lineHeight: 19,
        color: Colors.black,
        marginVertical: 5
    },
    row:{
        flexDirection: 'row',
    },
    txtdiachi:{
        fontSize: 11,
        lineHeight: 14,
        color: Colors.gray,
    },
    txtTag:{
        fontSize: 11,
        lineHeight: 15,
        color: Colors.gray,
        marginBottom: 5,
    },
    GroupS: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    txtDanhgia:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    txt: {
        color: Colors.black
    }
})
export {LoveCard}
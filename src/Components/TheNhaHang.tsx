import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Colors } from '../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { getPoster } from '../Services/StaticImageService';
import Ionicons from "react-native-vector-icons/Ionicons";

interface RestaurantCardProps {
    name: any;
    id: any;
    images: {
      poster: any;
    };
    tags: any;
    distance: any;
    time: any;
  }

const RestaurantCard: React.FC<RestaurantCardProps> = ({name, id, images: { poster }, tags, distance, time}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.the}>
                <Image 
                    source={{uri: getPoster(poster)}}
                    style={styles.image}
                    resizeMode= 'stretch'/>
                <View style={styles.hop}>
                    <Text style={styles.txtName}>{name}</Text>
                </View>
                <View style={styles.hop}>
                    <Text style={styles.txtTag}>{tags?.join(' - ')}</Text>
                </View>
                <View style={styles.GroupS}>
                    <View style={styles.txtDanhgia}>
                        <Ionicons name='star' size={20} color={Colors.mau_icon}/>
                        <Text style={styles.Txtrating}>4</Text>
                        <Text style={styles.Txtreviews}>({10})</Text>
                    </View>
                    <View style={styles.tx}> 
                        <View style={styles.txDistance}>
                            <Ionicons name='location-outline' size={20} color={Colors.mau_chu_2}/>
                            <Text style={styles.KmGiao}>{distance}</Text>
                        </View>

                        <View style={styles.txDistance}>
                            <Ionicons name='time' size={20} color={Colors.mau_chu_2}/>
                            <Text style={styles.KmGiao}>{time}'</Text>
                        </View>
                    </View>
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
        borderRadius: 10,
        marginRight: 10,
        marginTop: 10
    },
    the: {
        width: '100%',
        height: 250,
    },
    txtName: {
        fontSize: 20,
        color: Colors.mau_chu_2,
        textAlign:'center'
    },
    image: {
        flex: 1, 
        borderRadius: 10
    },
    hop: {
        height: '25%',
        paddingLeft: 5,
        width: 250,
    },
    txtTag: {
        fontSize: 13,
        lineHeight: 15,
        fontStyle: 'italic',
        color: Colors.white,
        paddingHorizontal: 5
    },
    GroupS: {
        flexDirection: 'row',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    Txtrating: {
        paddingLeft: 5,
        color: Colors.white
    },
    Txtreviews: {
        color: Colors.white
    },
    txDistance: {
        flexDirection: 'row',
        backgroundColor: Colors.mau_vien_distance,
        borderRadius: 10,
        padding: 2,
        marginRight: 7
    },
    txtDanhgia:{
        flexDirection: 'row',
        marginLeft: 5
    },
    KmGiao: {
        color: Colors.mau_chu_2,
        marginRight: 2
    },
    tx:{
        flexDirection: 'row',
    }
})
export {RestaurantCard}
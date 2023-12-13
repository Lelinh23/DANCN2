import React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Colors } from '../assets/colors';

const DanhMucItem = ({name, isActive, chonNhomItem}: {name: any, isActive: any, chonNhomItem: any}) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text 
            style={isActive ? styles.txtName1 : styles.txtName2} 
            onPress={() => chonNhomItem(name)}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}
export { DanhMucItem };
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: Colors.mau_vien_distance,
        height: 40,
        width: 100
    },
    txtName1: {
        fontSize: 18,
        color: Colors.black
    },
    txtName2: {
        fontSize: 18,
        color: Colors.gray
    },
})
import React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Colors } from '../assets/colors';
import { getCoIcon } from '../Services/StaticImageService';

const CoItem = ({code, name, dial_code, onPress}: {code: any, name: any, dial_code: any, onPress: any}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress({code, name, dial_code})}>
            <Image style={styles.anhCo} source={{uri: getCoIcon(code) }}/>
            <Text style={styles.txtCo}>{dial_code}</Text>
            <Text style={styles.txtCo}>{name}</Text>
        </TouchableOpacity>
    )
}
export { CoItem };
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    anhCo: {
        height: 25,
        width: 25,
        marginRight: 10,
    },
    txtCo: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        color: Colors.white,
        marginRight: 10,
    }
})
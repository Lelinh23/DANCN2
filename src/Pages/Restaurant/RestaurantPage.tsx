import React, { useEffect } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../assets/colors';
import { Images } from '../../assets/images';
import { SCREENS } from "../../helpers/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const RestaurantPage = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                barStyle="light-content" 
                backgroundColor={Colors.nen}
                translucent/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.nen
    },
});

export default RestaurantPage;

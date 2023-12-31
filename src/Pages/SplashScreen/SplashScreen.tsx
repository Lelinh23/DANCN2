import React, { useEffect } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../assets/colors';
import { Images } from '../../assets/images';
import { SCREENS } from "../../helpers/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const SplashPage = () => {
    const navigation = useNavigation();
    // useEffect(()=> {
    //     setTimeout(()=>{
    //         navigation.navigate(SCREENS.HI);
    //     }, 3000)
    // }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                barStyle="light-content" 
                backgroundColor={Colors.nen}
                translucent/>
            <View style={styles.container}>
                <Image source={Images.LOGO} resizeMode="contain" style={styles.image} />
                <Text style={styles.titleText}>FooDelivery</Text>
            </View>
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
    image: {
        height: 100,
        width: 100,
    },
    titleText: {
        color: Colors.black,
        fontSize: 32
    }
});

export default SplashPage;

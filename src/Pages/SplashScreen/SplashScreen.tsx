import React, { useEffect } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../assets/colors';
import { Images } from '../../assets/images';
import { SCREENS } from "../../helpers/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const SplashPage = () => {
    const navigation: any = useNavigation();
    useEffect(()=> {
        setTimeout(()=>{
            navigation.navigate(SCREENS.LOGIN);
        }, 3000)
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                barStyle="light-content" 
                backgroundColor={Colors.nen}
                translucent/>
            <View style={styles.container}>
                <LottieView source={Images.LOGO} resizeMode="contain" style={styles.image} autoPlay/>
                <Text style={styles.titleText}>Đặt đồ ăn</Text>
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
        height: 250,
        width:  250,
    },
    titleText: {
        color: Colors.white,
        fontSize: 32
    }
});

export default SplashPage;

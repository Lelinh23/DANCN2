import React, { useEffect } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../assets/colors';
import { SafeAreaView } from "react-native-safe-area-context";
import { SCREENS } from "../../helpers/constants";

const GioiThieuPage = ({navigation}: {navigation: any}) => {

    useEffect(()=> {
        setTimeout(()=>{
            navigation.navigate(SCREENS.LOGIN);
        }, 3000)
    }, [])
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                barStyle="light-content" 
                backgroundColor={Colors.primary1}
                translucent/>
            <View style={styles.container}>
                <Text>Hi</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary1
    },
});

export default GioiThieuPage;

import React, { useEffect } from "react";
import { FlatList, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../assets/colors';
import { Images } from '../../assets/images';
import { SCREENS } from "../../helpers/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppDispatch, useAppSelector } from "../../Redux/app/hooks";
import { GetLove } from "../../Redux/Actions/LoveAction";
import { LoveCard } from "../../Components/LoveCart";

const LovePage = () => {
    const navigation: any = useNavigation();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch<any>(GetLove());
    }, []);
    const love = useAppSelector(state => state?.loveState?.love)
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                barStyle="light-content" 
                backgroundColor={Colors.nen}
                translucent/>
            <View style={styles.container}>
                <View style={styles.groupHearder}>
                    <Ionicons name="arrow-back" size={30} style={styles.iconBack} 
                              onPress={() => navigation.goBack()}/>
                    <Text style={styles.txtMuc}>YÊU THÍCH</Text>
                </View>
                <FlatList 
                    style={styles.loveList}
                    data={love}
                    keyExtractor={item => item?.IdNhaHang}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => <LoveCard
                        {...item?.restaurant} 
                        navigate={(IdNhaHang: any) => navigation.navigate(SCREENS.RESTAURANT, {IdNhaHang})}
                    />}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.nen,
    },
    groupHearder:{
        marginHorizontal: 25,
        flexDirection: 'row',
        height: 40,
        width: '100%',
        marginTop: 10
    },
    txtMuc:{
        fontSize: 25,
        marginLeft: 100,
        width: '90%',
        alignItems: 'center',
        color: Colors.white
    },
    iconBack:{
        width: '10%',
        color: Colors.white
    },
    loveList:{

    }
});

export default LovePage;

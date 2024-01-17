import React, { useEffect } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../assets/colors';
import { Images } from '../../assets/images';
import Ionicons from "react-native-vector-icons/Ionicons";
import { SCREENS } from "../../helpers/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { SortNHCard } from "../../Components/TheSortNH";
import { FoodCart } from "../../Components/FoodCart";
import LottieView from "lottie-react-native";

const CategoryPage = ({route}: {route: any}) => {
    const navigation: any = useNavigation();
    const { ketqua, activeDanhMuc } = route.params;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            
            
            <View style={styles.header}>
                <View style={{flexDirection: 'row', width: '50%', justifyContent: 'space-between'}}>
                    <Ionicons
                        name="chevron-back-outline"
                        size={30}
                        color={Colors.white}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.txttimkiem}>{activeDanhMuc?.toUpperCase()}</Text> 
                </View>
            </View>
            <ScrollView style={styles.container}>
                {ketqua && ketqua.length > 0 ? (
                    ketqua?.map((item: any) => (
                        <FoodCart 
                            {...item} 
                            key={item?.id} 
                            navigate={() => navigation.navigate(SCREENS.FOOD, {foodId: item?.id})}
                        />
                    ))
                ) : (
                    <View style={styles.ViewNotItem}>
                        <LottieView source={Images.CATEGORY} style={styles.lottie} autoPlay />
                        <Text style={styles.txtNo}>Không có món nào trong danh mục này</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 4,
    },
    header:{
        backgroundColor: Colors.nen,
        lineHeight: 60,
        paddingVertical: 15, 
    },
    txttimkiem:{
        fontSize: 20,
        lineHeight: 40,
        color: Colors.white,
        textAlign: 'center',
        backgroundColor: Colors.nen,
    },
    ViewNotItem:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: 50
    },
    lottie:{
        width: 200,
        height: 200
    },
    txtNo:{
        marginTop: 30,
        fontSize: 20,
        color: Colors.mau_icon,
        fontWeight: 'bold',
    },
    
});


export default CategoryPage;

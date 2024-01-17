import React, { useEffect } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../assets/colors';
import { Images } from '../../assets/images';
import Ionicons from "react-native-vector-icons/Ionicons";
import { SCREENS } from "../../helpers/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { SortNHCard } from "../../Components/TheSortNH";

// ...

const KetQuaSearchPage = ({route}: {route: any}) => {
    const navigation: any = useNavigation();
    const { ketqua } = route.params;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            
            
            <View style={styles.header}>
                <View style={{flexDirection: 'row', width: '80%', justifyContent: 'space-between'}}>
                    <Ionicons
                        name="chevron-back-outline"
                        size={30}
                        color={Colors.white}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.txttimkiem}>KẾT QUẢ TÌM KIẾM</Text> 
                </View>
            </View>
            <ScrollView style={styles.container}>
                {ketqua && ketqua.length > 0 ? (
                    ketqua?.map((item: any) => (
                        <SortNHCard 
                            {...item} 
                            key={item?.id} 
                            navigate={(IdNhaHang: any) => navigation.navigate(SCREENS.RESTAURANT, {IdNhaHang})}
                        />
                    ))
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Không tìm thấy nhà hàng có món đó</Text>
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
        paddingTop: 0,
        marginTop: 1,
    },
    header:{
        backgroundColor: Colors.nen,
        lineHeight: 60,
        paddingVertical: 15, 
    },
    txttimkiem:{
        marginTop: 0,
        fontSize: 20,
        lineHeight: 40,
        color: Colors.white,
        textAlign: 'left',
        verticalAlign: 'top',
        // fontWeight: 'bold',
        backgroundColor: Colors.nen,
    }
    
});

// ...


export default KetQuaSearchPage;

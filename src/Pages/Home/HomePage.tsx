import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SCREENS } from "../../helpers/constants";
import { SafeAreaView } from "react-native";
import { Colors } from "../../assets/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DanhMuc } from "../../Components/DanhMuc";
import { getNhaHang } from "../../Services/Restaurant";
import { useNavigation } from "@react-navigation/native";
import { RestaurantCard } from "../../Components/TheNhaHang"; 
import { SortNHCard } from "../../Components/TheSortNH";

const sortStyle = (isActive: any) => isActive ? styles.sortList : {
    ...styles.sortList, borderBottomColor: Colors.mau_icon
}

const HomePage = ({}) => {
    const navigation: any = useNavigation();

    const[nhahangs, setNhaHang] = useState<any | null>(null);
    const[activeSortItem, setActiveSortItem] = useState('gần đây')

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getNhaHang().then(response => {
                if (response?.status) {
                    setNhaHang(response?.data);
                }
            })
        })
        return unsubscribe
    }, [navigation])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content" 
                backgroundColor={Colors.nen}
                translucent/>
            <View style={styles.header}>

                <View style={styles.GroupDiaChi}>
                    <Text style={styles.txtgiao}>Giao đến: </Text>
                    <View style={styles.diachi}>
                        <Ionicons name="location-sharp" size={30} color={Colors.mau_icon}/>
                        <Text style={styles.txtdiachi}>Ngũ Hành Sơn, Đà Nẵng</Text>
                        <Ionicons name="caret-down-outline" size={20} color={Colors.white}/>
                        <Icon name="bell-outline" size={30} color={Colors.white} style={{position: 'absolute', right: '5%'}}/>
                        <View style={styles.thongbao}>
                            <Text style={styles.txtThongbao}>22</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.GroupSearch}>
                    <View style={styles.txtSearch}>
                        <Ionicons name="search" size={30} color={Colors.mau_icon}/>
                        <Text style={styles.txtgiao}>Tìm kiếm</Text>
                    </View>
                    <View style={styles.searchLoc}>
                        <Ionicons name="filter" size={30} color={Colors.white} style={{marginRight: 0}}/>
                    </View>
                </View>

                <View style={styles.GroupDanhMuc}>
                    <DanhMuc />
                </View>
            </View>
            <ScrollView style={styles.listAll}>
                <View style={styles.GroupNhaHang}>
                    <View style={styles.grTieuDe}>
                        <Text style={styles.txtLeft}>Top nhà hàng</Text>
                        <Text style={styles.txtRight}>Xem tất cả</Text>
                    </View>
                    <FlatList 
                        data={nhahangs}
                        keyExtractor={(item) => item?.id}
                        horizontal
                        renderItem={({item}) => (
                            <RestaurantCard
                            {...item} navigate={(IdNhaHang: any) => navigation.navigate(SCREENS.RESTAURANT, {IdNhaHang})}/>
                        )}/>
                </View>
                <View style={styles.sortList}>
                    <TouchableOpacity 
                        style={sortStyle(activeSortItem === 'gần đây')} 
                        onPress={() => setActiveSortItem('gần đây')}>
                        <Text style={styles.txtSort}>Gần đây</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={sortStyle(activeSortItem === 'yêu thích')} 
                        onPress={() => setActiveSortItem('yêu thích')}>
                        <Text style={styles.txtSort}>Yêu thích</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={sortStyle(activeSortItem === 'top tuần')}  
                        onPress={() => setActiveSortItem('top tuần')}>
                        <Text style={styles.txtSort}>Top tuần</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={sortStyle(activeSortItem === 'bán chạy')}  
                        onPress={() => setActiveSortItem('bán chạy')}>
                        <Text style={styles.txtSort}>Bán chạy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={sortStyle(activeSortItem === 'đánh giá')}  
                        onPress={() => setActiveSortItem('đánh giá')}>
                        <Text style={styles.txtSort}>Đánh giá</Text>
                    </TouchableOpacity>
                </View>
                {nhahangs?.map((item: any) => (
                        <SortNHCard {...item} key={item?.id}/>
                    ))}  
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
    },
    header: {
        backgroundColor: Colors.nen,
        height: '33%',
        position: 'absolute',
        width: '100%',
        borderRadius: 30,
    },
    GroupDiaChi: {
        marginTop: '13%',
        marginLeft: '5%',
    },
    diachi: {
        flexDirection: 'row',
    },
    txtgiao: {
        fontSize: 15,
        color: Colors.mau_chu,
        fontStyle: 'italic',
    },
    txtdiachi: {
        fontSize: 18,
        color: Colors.white,
        lineHeight: 30
    },
    thongbao: {
        backgroundColor: Colors.mau_chu,
        justifyContent: 'center',
        borderRadius: 30,
        height: '60%',
        width: '5%',
        position: 'absolute',
        right: '3%', 
        alignItems: 'center'
    }, 
    txtThongbao: {
        fontSize: 12,   
        color: Colors.white,
        lineHeight: 15
    },
    GroupSearch: {
        marginLeft: '5%',
        flexDirection: 'row',
        marginTop: '4%',
    },
    txtSearch: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        width: '85%',
        alignItems: 'center', 
        borderRadius: 5, 
        paddingLeft: '2%'
    },
    searchLoc: {
        backgroundColor: Colors.mau_icon,
        marginLeft: '2%',
        padding: 3,
        alignItems: 'center',
        borderRadius: 5
    },
    GroupDanhMuc: {
        marginVertical: '4%'
    },
    listAll: {
        zIndex: -1,
        marginTop: '55%',
    },
    GroupNhaHang: {
        marginTop: '5%',
        paddingLeft: '5%',
        paddingVertical: '5%',
    }, 
    grTieuDe: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txtLeft: {
        color: Colors.nen,
        fontSize: 20,
        lineHeight: 21
    },
    txtRight: {
        color: Colors.mau_icon,
        fontSize: 15,
        lineHeight: 20,
        paddingRight: '5%'
    },
    sortList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'row',
        borderBottomColor: Colors.white,
        borderBottomWidth: 5,
        backgroundColor: Colors.mau_icon,
        marginHorizontal: 2
    },
    sort: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    txtSort: {
        fontSize: 18,
        lineHeight: 20,
        padding: 5
    }
})

export default HomePage
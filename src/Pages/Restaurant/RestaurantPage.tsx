import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../assets/colors';
import { SCREENS } from "../../helpers/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getGallery } from "../../Services/StaticImageService";
import { getNhaHangTheo1Id } from "../../Services/Restaurant";
import { STATIC_IMAGE } from "../../helpers/ApiConstants";
import Ionicons from "react-native-vector-icons/MaterialIcons";
import { Images } from "../../assets/images";
import LottieView from "lottie-react-native";
import { DanhMucItem } from "../../Components/PhanLoaiFood";
import { FoodCart } from "../../Components/FoodCart";
import { useAppDispatch, useAppSelector } from "../../Redux/app/hooks";
import { AddYeuThich, GetLove, XoaKhoiLove } from "../../Redux/Actions/LoveAction";

const RestaurantPage = ({ route }: { route: any }) => {
    const navigation: any = useNavigation();
    const  { params: { IdNhaHang } } = route;

    const [nhahang, setNhaHang] = useState<any>(null);
    const [chonNhomItem, setChonNhomItem] = useState(null);
    // const [love, setLove] = useState(false) 
    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch<any>(GetLove());
    // }, []);

    useEffect(() => {
        getNhaHangTheo1Id(IdNhaHang).then(response => {
            setChonNhomItem(response?.data?.categories[0]);
            setNhaHang(response?.data);
            dispatch<any>(GetLove());
        });
    }, [IdNhaHang]); // Added IdNhaHang as a dependency to rerun the effect when it changes

    const isLove = useAppSelector(state =>
        state?.loveState?.love?.filter((item: any) => item?.IdNhaHang === IdNhaHang)?.length > 0)

    const addYeuThich = () => dispatch<any>(AddYeuThich(IdNhaHang))
    const xoaKhoiLove = () => dispatch<any>(XoaKhoiLove(IdNhaHang))

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
            {nhahang && (
                <Image
                    source={{ uri: getGallery(nhahang?.images?.cover,STATIC_IMAGE.SIZE.SQUARE) }}
                    style={styles.image}  resizeMode='stretch'
                />
            )}
            <ScrollView>
                <View style={styles.hearder}>
                    <View style={styles.groupTille}>
                        <Text style={styles.txtName}>{nhahang?.name}</Text>
                        <Ionicons 
                            name={isLove ? 'favorite' : 'favorite-border'} 
                            size={25} 
                            color={Colors.mau_icon}
                            onPress={() => isLove ? xoaKhoiLove() : addYeuThich()}
                        />
                    </View>
                    <Text style={styles.txtTag}>{nhahang?.tags?.slice(0,3).join('  -  ')}</Text>
                    <View style={styles.sao}>
                        <Ionicons name="star" size={20} color={Colors.mau_icon}/>
                        <Text style={styles.txt}> 4</Text>
                        <Text style={styles.txt}> (423 đánh giá)</Text>
                    </View>
                    <View style={styles.groupGiao}>
                        <View style={styles.giao1}>
                            <LottieView style={styles.lottie} source={Images.DELIVELY} autoPlay/>
                            <Text style={styles.txt}>FREESHIP</Text>
                        </View>

                        <View style={styles.giao2}>
                            <LottieView style={styles.lottie2} source={Images.DISTANCE} autoPlay/>
                            <Text style={styles.txt}>{nhahang?.distance}m</Text>
                        </View>

                        <View style={styles.giao3}>
                            <LottieView style={styles.lottie3} source={Images.TIME} autoPlay/>
                            <Text style={styles.txt}> {nhahang?.time} phút</Text>
                        </View>

                        <View style={styles.giao4}>
                            <Text style={styles.txt}>{nhahang?.type}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.danhmuc}>
                    <FlatList 
                    data={nhahang?.categories}
                    keyExtractor={(item: any) => item}
                    horizontal
                    renderItem={({item}) => 
                        <DanhMucItem 
                            name={item}
                            isActive={item === chonNhomItem}
                            chonNhomItem={((category: any) => setChonNhomItem(category))}
                        />}
                    />
                </View>
                <View style={styles.foodList}>
                    {nhahang?.foods?.filter((food: any) => ( 
                        chonNhomItem ? food?.category === chonNhomItem : true))
                        ?.map((item: any) => (
                            <FoodCart 
                                key={item?.id}
                                {...item}
                                navigate={() => navigation.navigate(
                                    SCREENS.FOOD,
                                    {foodId: item?.id}
                                )}
                            />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '45%',
    },
    hearder:{
        marginTop: '65%',   
        backgroundColor: Colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    groupTille:{
        flexDirection: 'row',
        marginTop: '5%',
        maxHeight: 50, 
        marginBottom:  10,
        paddingHorizontal: '5%'
    },
    txtName:{
        width: '88%',
        marginRight: '5%',
        fontSize: 20,
        color: Colors.black
    },
    txtTag:{
        color: Colors.mau_tag,
        marginBottom: 10,
        fontSize: 15,
        fontStyle: 'italic',
        paddingHorizontal: '5%'
    },
    sao:{
        flexDirection: 'row',
        paddingHorizontal: '5%'
    },
    txt: {
        fontSize: 15,
        color: Colors.black,
    }, 
    groupGiao:{
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent:'space-evenly'
    },
    lottie:{
        width: 50, 
        height: 50, 
    },
    lottie2:{
        width: 30, 
        height: 30, 
    },
    lottie3:{
        width: 20, 
        height: 20, 
    },
    giao1:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    giao2:{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5
    },
    giao3:{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5
    },
    giao4:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.mau_icon,
        height: 30,
        justifyContent: 'center',
        padding: 5,
        borderRadius: 10,
        width: 80
    },
    danhmuc:{
        alignItems: 'center',
        width: '100%'
    },
    foodList:{
        backgroundColor: Colors.white,
    }

});

export { RestaurantPage };

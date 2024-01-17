// AllOrderList.tsx
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../assets/colors";
import { STATIC_IMAGE } from "../helpers/ApiConstants";
import { getGallery } from "../Services/StaticImageService";
import { SCREENS } from "../helpers/constants";
import { create } from "react-test-renderer";

// Define the props interface for AllOrderList component
interface AllOrderListProps {
  orders: any[]; // Define the type of orders array
  navigate: any;
}

const AllOrderList: React.FC<AllOrderListProps> = ({ orders, navigate }) => (
    
  <ScrollView>
    {orders?.
    sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((orderItem: { don_hang: any[], food: any[], metaData: any, _id: any, createdAt: string, status: string }, index: number) => (
      <TouchableOpacity key={index} onPress={() =>
        navigate(
            SCREENS.TRACK_ORDER, 
            {
            orderId: orderItem._id,
            orderDate: orderItem.createdAt,
            orderStatus: orderItem.status,
            })}>
        <View style={styles.GoupOrder}>
            <Text  style={styles.txtTenMuc1}>Đơn hàng: {orderItem._id}</Text>
            <ScrollView>    
                <View style={styles.foodList}>
                    <View style={styles.row}>
                        <Text style={styles.txtTenMuc}>Đơn ngày: {new Date(orderItem.createdAt).toLocaleDateString()}</Text>
                        <Text style={styles.txtTenMuc}> Đặt lúc: {new Date(orderItem.createdAt).toLocaleTimeString('vi-VN', { hour: 'numeric', minute: 'numeric' })}</Text>
                    </View>
                    <Text style={styles.txtTenMuc}>Tình trạng đơn hàng: {orderItem.status}</Text>
                {orderItem?.food?.map((item: any, itemIndex: number) => {
                    // Find the corresponding don_hang item for the current food
                    const correspondingDonHangItem = orderItem.don_hang.find((donHangItem: any) => donHangItem.foodId === item.id);
                    return (
                        <View key={itemIndex} style={styles.row}>
                            <TouchableOpacity onPress={() => navigate(SCREENS.FOOD, { foodId: item.id })}>
                                <Image
                                style={styles.image}
                                resizeMode='stretch'
                                source={{ uri: getGallery(item?.image, STATIC_IMAGE.SIZE.SQUARE)}}
                                />
                            </TouchableOpacity>
                            <View >
                                <Text style={styles.txtTenFood}>{item.name}</Text>
                                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                                    <Text style={styles.txt}>{item.price.toFixed(3)}đ</Text>
                                    <Text style={styles.indam}>x{correspondingDonHangItem?.count}</Text>
                                </View>
                            </View>
                        </View>
                    );
                })}
                </View>
                <View style={styles.paymentMethod}>
                    <Text style={styles.txt}>Phương phức: Thanh toán khi nhận hàng</Text>
                    <View style={[styles.row, {justifyContent: 'space-between'}]}>
                        <Text style={styles.txt}>Tạm tính({orderItem?.metaData?.monTotal} món):</Text>
                        <Text style={styles.txt}> 
                            {orderItem?.metaData?.itemTotal.toFixed(3)}đ
                        </Text>
                    </View>
                    <View style={[styles.row, {justifyContent: 'space-between'}]}>
                        <Text style={styles.txt}>Giảm giá:</Text>
                        <Text style={styles.txt}> 
                            - {orderItem?.metaData?.giamGia.toFixed(3)}đ
                        </Text>
                    </View>
                    <View style={[styles.row, {justifyContent: 'space-between'}]}>
                        <Text style={styles.txt}>Tổng cộng:</Text>
                        <Text style={styles.txt}> 
                            {orderItem?.metaData?.tongCong.toFixed(3)}đ
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default AllOrderList;

const styles = StyleSheet.create({
    orderSummary:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.nen,
        marginTop: 24,
        padding: 10
    },
    txtTitle: {
        fontSize: 20,
        lineHeight: 25,
        color: Colors.white,
    },
    bell: {
        backgroundColor: Colors.mau_vien_bt_sdt,
        position: 'absolute',
        height: 20,
        width: 20,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        right: 0
    },
    txtBell: {
        fontSize: 12,
        lineHeight: 14,
        color: Colors.white,
    },
    GoupOrder:{
        backgroundColor: Colors.nen,
        elevation: 3,
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 10
    },
    paymentMethod:{
        backgroundColor: Colors.mau_icon,
        elevation: 3,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    txt:{
        fontSize: 15,
        color: Colors.white
    },
    foodList:{
        marginHorizontal: 5
    },
    
    txtTenMuc:{
        fontSize: 19,
        paddingHorizontal: 10,
        paddingTop: 10,
        color: Colors.white,
        
    },
    txtTenMuc1:{
        fontSize: 19,
        paddingHorizontal: 10,
        lineHeight:35,
        paddingTop: 10,
        color: Colors.white,
        borderWidth: 0.5,
        backgroundColor: Colors.mau_tag,
        fontWeight: 'bold',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
        
    },
    image: {
        height: 100,
        width: 100,
        marginBottom: 10,
        marginRight: 10
    },
    row:{
        flexDirection: 'row',
    },
    txtTenFood:{
        color: Colors.white,
        fontSize: 27,
        maxWidth: 250,
        maxHeight: 90,
        marginLeft: 0,
        textAlign: 'center'
    },
    indam:{
        fontSize: 15,
        color: Colors.white
    }
});


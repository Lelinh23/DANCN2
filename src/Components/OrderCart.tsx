// AllOrderList.tsx
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../assets/colors";
import { STATIC_IMAGE } from "../helpers/ApiConstants";
import { getGallery } from "../Services/StaticImageService";

// Define the props interface for AllOrderList component
interface AllOrderListProps {
  orders: any[]; // Define the type of orders array
  navigate: any;
}

const AllOrderList: React.FC<AllOrderListProps> = ({ orders, navigate }) => (
  <ScrollView>
    {orders?.map((orderItem: { don_hang: any[], food: any[], metaData: any, createdAt: string, status: string }, index: number) => (
      <View key={index}>
        <View style={styles.GoupOrder}>
            <Text style={styles.txtTenMuc}>Thông tin đơn hàng </Text>
            <ScrollView>
                <View style={styles.foodList}>
                    <Text style={styles.txtTenMuc}>Ngày đặt hàng: {new Date(orderItem.createdAt).toLocaleDateString()}</Text>
                    <Text style={styles.txtTenMuc}>Giờ đặt hàng: {new Date(orderItem.createdAt).toLocaleTimeString('vi-VN', { hour: 'numeric', minute: 'numeric' })}</Text>
                    <Text style={styles.txtTenMuc}>Tình trạng đơn hàng: {orderItem.status}</Text>
                {orderItem?.food?.map((item: any, itemIndex: number) => {
                    // Find the corresponding don_hang item for the current food
                    const correspondingDonHangItem = orderItem.don_hang.find((donHangItem: any) => donHangItem.foodId === item.id);
                    return (
                        <View key={itemIndex} style={styles.row}>
                            <TouchableOpacity onPress={() => navigate()}>
                                <Image
                                style={styles.image}
                                resizeMode='stretch'
                                source={{ uri: getGallery(item?.image, STATIC_IMAGE.SIZE.SQUARE)}}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.txtTenFood}>{item.name}</Text>
                                <Text style={styles.txt}>{item.price}</Text>
                                <Text>{correspondingDonHangItem?.count}</Text>
                            </View>
                        </View>
                    );
                })}
                </View>
                <View style={styles.paymentMethod}>
                    <Text style={styles.txtTenMuc}>Phương thức thanh toán</Text>
                    <Text style={styles.txt}>Thanh toán khi nhận hàng</Text>
                    <Text style={styles.txt}>Tạm tính({orderItem?.metaData?.monTotal} món): {orderItem?.metaData?.itemTotal}</Text>
                    <Text style={styles.txt}>Giảm giá: {orderItem?.metaData?.giamGia}</Text>
                    <Text style={styles.txt}>Tổng cộng: {orderItem?.metaData?.tongCong}</Text>
                </View>
            </ScrollView>
        </View>
      </View>
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
        backgroundColor: Colors.red,
        elevation: 3,
        marginHorizontal: 10,
        marginTop: 5,
        borderRadius: 10
    },
    paymentMethod:{
        backgroundColor: Colors.mau_icon,
        elevation: 3,
        paddingHorizontal: 10
    },
    txt:{
        fontSize: 15,
        color: Colors.white
    },
    foodList:{
        marginHorizontal: 5
    },
    txtTenMuc:{
        fontSize: 20,
        paddingHorizontal: 10,
        paddingTop: 10,
        color: Colors.white
    },
    image: {
        height: 100,
        width: 100,
        margin: 6,
        borderRadius: 8,
    },
    row:{
        flexDirection: 'row',
    },
    txtTenFood:{
        color: Colors.white,
        fontSize: 25,
        maxWidth: 250,
        maxHeight: 90
    }
});

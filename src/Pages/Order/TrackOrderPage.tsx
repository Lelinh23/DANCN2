import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../assets/colors";
import { useNavigation } from "@react-navigation/native";

const TrackOrderPage = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const { orderId, orderDate, orderStatus } = route.params;

  const getStatusColor = () => {
    switch (orderStatus) {
      case "Đang chờ xử lý":
        return Colors.red;
      case "Đang giao cho shipper":
        return Colors.mau_vien_bt_sdt;
      case "Đang giao":
        return Colors.mau_vien_distance;
      case "Đã giao":
        return Colors.green;
      default:
        return Colors.gray;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.orderSummary, { backgroundColor: getStatusColor() }]}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color={Colors.white}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.txtTitle}>TÌNH TRẠNG GIAO HÀNG</Text>
      </View>

      <View style={styles.orderDetails}>
        <Text style={styles.detailTitle}>Mã đơn hàng:</Text>
        <Text style={styles.detailValue}>{orderId}</Text>

        <Text style={styles.detailTitle}>Ngày đặt hàng:</Text>
        <Text style={styles.detailValue}>{new Date(orderDate).toLocaleDateString()}</Text>

        <Text style={styles.detailTitle}>Trạng thái đơn hàng:</Text>
        <Text style={[styles.detailValue, { color: getStatusColor() }]}>{orderStatus}</Text>
      </View>
    </ScrollView>
  );
};

export default TrackOrderPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nen,
  },
  orderSummary: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: StatusBar.currentHeight || 24,
    paddingBottom: 10,
  },
  txtTitle: {
    fontSize: 20,
    lineHeight: 25,
    color: Colors.white,
    marginLeft: 10,
  },
  orderDetails: {
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  detailTitle: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  statusItem: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
});

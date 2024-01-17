// AllOrderPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAllOrder } from "../../Services/Order";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../assets/colors";
import AllOrderList from "../../Components/AllOrderCart";

const AllOrderPage = ({route}: {route: any}) => {
  const navigation = useNavigation();
  const { email } = route.params;
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    // Fetch orders when the component mounts
    getAllOrder(email).then(response => {
      setOrder(response?.data);
    }).catch(error => {
      console.error('Error fetching orders:', error);
    });
  }, []); // Fetch orders only once when the component mounts

  return (
    <ScrollView style={{marginTop: 18 }}>
      <View style={styles.orderSummary}>
        <Ionicons
            name="chevron-back-outline"
            size={30}
            color={Colors.white}
            onPress={() => navigation.goBack()}
        />
        <Text style={styles.txtTitle}>TẤT CẢ ĐƠN HÀNG</Text>
        <View style={{width: 35, height: 30}}>
            <Icon name="bell" size={30} color={Colors.white} />
            <View style={styles.bell}>
                <Text style={styles.txtBell}>12</Text>
            </View>
        </View>
      </View>
      <AllOrderList orders={order?.data} navigate={navigation.navigate} />
    </ScrollView>
    
  );
};

export default AllOrderPage;

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
})
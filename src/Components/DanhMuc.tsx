import React, { useState } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { Images } from '../assets/images';
import { DANHMUC } from '../helpers/Mock';
import { Colors } from '../assets/colors';

const DanhMuc = () => {
    const [activeDanhMuc, setActiveDanhMuc] = useState<string | null>(null);
  return (
    <View style={styles.container}>
      {DANHMUC.map(({ name, logo }: { name: any, logo: string }) => (
        <TouchableOpacity
          style={styles.danhmuc}
          key={name}
          onPress={() => setActiveDanhMuc(name)}
        >
          <Image source={Images[logo]} style={styles.danhmucIcon} resizeMode='center'/>
          <Text style={styles.txtDanhMuc}>{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export { DanhMuc };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  danhmuc: {
    alignItems: 'center',
    width: '16%',
    marginHorizontal: '2%'
  },
  danhmucIcon: {
    width: '90%',
    height: '50%',
    borderRadius: 3
  },
  txtDanhMuc: {
    color: Colors.white
  },
});

import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Images from '../../utils/Images';

export default function HomeBanner() {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <Image 
        source={Images.banner} 
        style={styles.imageContainer} 
        resizeMode="contain"  
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:15, 
    borderRadius:40,
    overflow:"hidden"
  },
  imageContainer: {
    width: '100%', 
    height: 210,
    borderRadius:10,
  },
});

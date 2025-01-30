import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../themes/Colors';

const { width } = Dimensions.get('window'); 
const ITEM_WIDTH = width * 0.45; 
const IMAGE_HEIGHT = ITEM_WIDTH * 0.6; 

const CommonProduct = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.badgeContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Bestseller</Text>
        </View>
        {item?.productDetail?.[0]?.variants?.length > 0 && (
          <Text style={styles.variantText}>
            {item.productDetail[0].variants.length} Variants
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => navigation.navigate('ProductDetails', { item })}>
        <Image
          source={{ uri: item?.image }}
          // style={[styles.productImage]}
          style={[styles.productImage, { aspectRatio: item?.aspectRatio || 1 }]}
          // resizeMode="cover"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text numberOfLines={1} style={styles.productTitle}>
        {item?.name}
      </Text>

      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => navigation.navigate('ProductDetails', { item })}>
        <Text style={styles.buyButtonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommonProduct;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    borderRadius: 10,
    padding: 10,
    margin: 8,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow:"hidden",
    borderWidth:0.3,
    borderColor:Colors.black
    // marginHorizontal:10
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 5,
  },
  badge: {
    backgroundColor: Colors.red,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    right:15,
    bottom:10
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  variantText: {
    fontSize: 12,
    color: 'black',
    fontWeight: '500',
    // right:15,
    bottom:10
  },
  imageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    bottom:5,
    overflow:"hidden",

  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    borderWidth:0.2,
    borderColor:Colors.black,
    // transform: [{ scale: 1.1 }],
    aspectRatio: 5,

    resizeMode: 'contain',
  },
  productTitle: {
    // fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    // marginVertical: 6,
    textAlign: 'center',
  },
  buyButton: {
    backgroundColor: Colors.red,
    paddingVertical: 8,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    marginTop: 6,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

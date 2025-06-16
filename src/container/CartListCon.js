import {StyleSheet, Text, View, TouchableOpacity, Animated, Image} from 'react-native';
import React from 'react';
import Colors from '../themes/Colors';

const CartListCon = ({item, decrementQuantity, incrementQuantity, index}) => {

  const scale = new Animated.Value(1);
  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
      <Image source={{ uri: item?.image }} style={styles.img} />
        <View style={styles.quantityContainer}>
          <Animated.View
            style={[
              styles.quantityButton,
              styles.minusButton,
              {transform: [{scale}]},
            ]}>
            <TouchableOpacity
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              onPress={() => decrementQuantity(index)}>
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.quantityTextContainer}>
            <Text style={styles.quantityText}>{item?.quantity}</Text>
          </View>

          <Animated.View
            style={[
              styles.quantityButton,
              styles.plusButton,
              {transform: [{scale}]},
            ]}>
            <TouchableOpacity
              disabled={item.quantity >= item?.stock_quantity}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              onPress={() => incrementQuantity(index)}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
      <View style={styles.productTextContainer}>
        {item?.productName && (
          <Text style={styles.productName}>{item.productName}</Text>
        )}
        {item?.productDetail?.variants && (
          <Text style={styles.productName}>
            Variants: {item.productDetail.variants}
          </Text>
        )}
        {item?.price && (
          <Text style={styles.productName}>Price: {item.price}</Text>
        )}
        {item?.productDetail?.sku && (
          <Text style={styles.productName}>
            SKU :{item?.productDetail?.sku}
          </Text>
        )}
      </View>
    </View>
  );
};

export default CartListCon;

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 100,
    borderWidth:1,
    borderColor:Colors.white,
    resizeMode:"contain",
    
  },
  container: {
    // paddingHorizontal: 16,
    // paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    margin: 10,
    marginHorizontal: 15,
    padding:12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productTextContainer: {
    marginTop: 12, // Add spacing between rows
    flexDirection: 'column',
  },
  productName: {
    fontSize: 16,
    color: Colors.text_color,
    fontWeight: '700',
    marginBottom: 4,
  },
  productDesc: {
    fontSize: 14,
    color: Colors.text_color,
    fontWeight: '400',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: Colors.white,
    elevation: 3,
  },
  quantityButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.buttonColor,
    borderRadius: 25,
    elevation: 3,
  },
  minusButton: {
    marginRight: 10,
  },
  plusButton: {
    marginLeft: 10,
  },
  quantityButtonText: {
    fontSize: 26,
    color: Colors.black,
    fontWeight: '600',
  },
  quantityTextContainer: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    color: Colors.primaryText,
    fontWeight: '500',
  },
});

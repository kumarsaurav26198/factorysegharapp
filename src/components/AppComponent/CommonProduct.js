/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {useActions} from '../../hooks/useActions';
import Colors from '../../themes/Colors';
import { useNavigation } from '@react-navigation/native';

const CommonProduct = ({item, cartRes}) => {
    const navigation = useNavigation();
  
  const {addToCartRequest} = useActions();

  return (
    <LinearGradient
    
      colors={['#ffffff', '#f5f5f5']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>Bestseller</Text>
        {item.productDetail[0]?.variants?.length > 0 && (
          <Text style={styles.categoryText}>
            {item.productDetail[0].variants.length === 1
              ? ` ${item.productDetail[0].variants[0]}`
              : `${item.productDetail[0].variants.length} Variants`}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={()=>{navigation.navigate("ProductDetails",{item})}}>

      <Image
        source={{uri: item?.image}}
        style={styles.productImage}
        resizeMode="contain"
        />
        </TouchableOpacity>
      <Text numberOfLines={1} style={styles.productTitle}>
        {item?.name}
      </Text>
      {/* <View style={styles.detailsContainer}>
        <Text style={styles.priceText}>${item?.price}</Text>
        <Text numberOfLines={2} style={styles.descriptionText}>
          {item?.description}
        </Text>
      </View> */}
      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => {
 const payload={
  "customerName": "rahul sharma",
  "mobile": "9891234513",
  item

 }
// console.log("payload",JSON.stringify(payload,null,2))
          addToCartRequest(payload);
          // addToCartRequest({
          //   itemId: item?.id,
          //   quantity: 1,
          //   name: item?.name,
          //   description: item?.description,
          //   price: item?.price,
          //   stock_quantity: item?.stock_quantity,
          // });
        }}
        >
        <Text style={styles.buyButtonText}>Add To Cart</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
const mapStateToProps = state => ({
  cartRes: state?.cartReducers,
});
export default connect(mapStateToProps)(CommonProduct);

const {width} = Dimensions.get('window');
const cardWidth = width * 0.5 - 20;
const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    borderRadius: 16,
    padding: 10,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    overflow: 'hidden',
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  badgeText: {
    backgroundColor: Colors.red,
    color: 'white',
    padding: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '600',
    right: 15,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '500',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 8,
    textAlign: 'center',
  },
  productImage: {
    width: cardWidth,
    height: cardWidth,
    borderWidth: 1,
    borderColor: Colors.bgColor,
    borderRadius: 8,
  },
  detailsContainer: {
    width: '100%',
    // marginVertical: 8,
    paddingHorizontal: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  buyButton: {
    backgroundColor: Colors.red,
    paddingVertical: 8,
    borderRadius: 24,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#FF4500',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: 4,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

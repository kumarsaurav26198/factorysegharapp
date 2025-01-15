import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import Images from '../../utils/Images';
import { connect } from 'react-redux';
import { useActions } from '../../hooks/useActions';

const CommonProduct = ({ item, cartRes }) => {
  const { addToCartRequest } = useActions();

  // console.log("cartReducers====>>", JSON.stringify(cartRes, null, 2));
  return (
    <View style={styles.container}>
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>Bestseller</Text>
        <Text style={styles.variantsText}>{item?.category}</Text>
      </View>
      <Text numberOfLines={1} style={styles.productTitle}>{item?.name}</Text>
      <Image
        source={Images.banner}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.caseText}>Price: {item?.price}</Text>
        <Text style={[ styles.piecesText, { color: item?.stock_quantity > 0 ? '#333' : 'red' } ]}>
          {item?.stock_quantity > 0 ? `${ item?.stock_quantity } Pieces` : 'Out of Stock'}
        </Text>

        <Text numberOfLines={1} style={styles.piecesText}>{item?.description}</Text>
      </View>
      <TouchableOpacity style={styles.buyButton} onPress={() => {
        addToCartRequest({
          "itemId": item?.id,
          "quantity": 1,
          "name":item?.name,
          "description":item?.description ,
          "price":item?.price,
          "stock_quantity":item?.stock_quantity,
        });
      }}>
        <Text style={styles.buyButtonText}>Add To Cart</Text>
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = state => ({
  cartRes: state?.cartReducers,
});
export default connect(mapStateToProps)(CommonProduct);

const { width } = Dimensions.get('window');
const cardWidth = width * 0.5 - 20;
const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
    left: -10
  },
  badgeText: {
    color: 'white',
    backgroundColor: '#8B0000',
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  variantsText: {
    fontSize: 14,
    color: '#333',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#000',
  },
  productImage: {
    width: cardWidth * 0.8,
    height: cardWidth * 0.5,
    // marginVertical: 16,
  },
  detailsContainer: {
    width: '100%',
    // marginVertical: 8,
  },
  caseText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  piecesText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  buyButton: {
    backgroundColor: '#8B0000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 26,
    marginTop: 16,
    width: '80%',
    margin: 20
  },
  buyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
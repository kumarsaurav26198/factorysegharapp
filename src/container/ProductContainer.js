import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {C_Text, CommonProduct} from '../components';
import {navigate} from '../services/navigationService';
import {connect} from 'react-redux';

const ProductContainer = ({allProductRes}) => {
  const allProduct = allProductRes?.data?.items || [];

  const handlePress = id => {
    navigate('ProductDetails');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allProduct}
        numColumns={2}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        // showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.productItem}>
            <CommonProduct item={item} />
          </View>
        )}
        // showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
const mapStateToProps = state => ({
  allProductRes: state?.getProductCategoryReducer,
  cartRes: state?.cartReducers,
});
export default connect(mapStateToProps)(ProductContainer);

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
  },
  headerText: {
    textAlign: 'left',
    // marginBottom: 15,
    bottom: 5,
  },
  productItem: {
    flex: 1,
    alignItems: 'center',
    // paddingHorizontal: 10,
  },
});

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { CommonProduct} from '../components';
import {connect} from 'react-redux';
import Colors from '../themes/Colors';

const ProductContainer = ({allProductRes}) => {
  const allProduct = allProductRes?.data?.items || [];

  return (
    <View style={styles.container}>
      {allProductRes?.loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={allProduct}
          numColumns={2}
          keyExtractor={(item, index) =>
            item?.id?.toString() || index.toString()
          }
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.productItem}>
              <CommonProduct item={item} />
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>---- No Data Found ---</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:100
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  errorText: {
    color: Colors.black,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});

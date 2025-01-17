import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CommonStyles } from '../../../themes/CommonStyles';
import { BackButton, CommonProduct } from '../../../components';
import { connect, useDispatch } from 'react-redux';
import { getAllProductRequest } from '../../../store/action/authActions';

const AllProduct = ({ allProductRes,cartRes }) => {
  console.log("GET_PRODUCT_CATOG_SUCCESS Reducers action===>", JSON.stringify(allProductRes?.error, null, 2));

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getAllProductRequest());
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getAllProductRequest());
    setRefreshing(false);
  }, [dispatch]);

  const renderItem = useCallback(({ item }) => (
    <View style={styles.productItem}>
      <CommonProduct item={item} />
    </View>
  ), []);

  return (
    <View style={CommonStyles.container}>
      <BackButton text="All Product" left cart  cartLenght={cartRes?.data?.length}/>

      {allProductRes?.loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : allProductRes?.error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {allProductRes.error?.response?.data?.message || 'An error occurred. Please try again later.'}
          </Text>
          <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
            <Text style={styles.refreshButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={[1]}
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <View style={styles.itemContainer}>
              <FlatList
                data={allProductRes?.data}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                columnWrapperStyle={styles.columnWrapper}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}
          ListFooterComponent={<View style={{ height: 20 }} />}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  allProductRes: state?.getProductCategoryReducer,
  cartRes: state?.cartReducers,

});
export default connect(mapStateToProps)(AllProduct);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    flex: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 28,
  },
});

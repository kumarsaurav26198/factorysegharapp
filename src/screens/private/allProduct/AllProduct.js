/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {CommonStyles} from '../../../themes/CommonStyles';
import {AllCategories, BackButton, CommonProduct} from '../../../components';
import {connect} from 'react-redux';
import {useActions} from '../../../hooks/useActions';
import { useRoute } from '@react-navigation/native';
import Colors from '../../../themes/Colors';


const AllProduct = ({allProductRes, cartRes}) => {
      const route = useRoute();
      const { category } = route?.params; 
  const allProduct = allProductRes?.data?.items || [];

  const {getProductByCategory} = useActions();
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [refreshing, setRefreshing] = useState(false);
  // console.log("GET_PRODUCT_CATOG_SUCCESS Reducers action===>", JSON.stringify(allProduct,null,2));

  const categories = [
    {category: 'ALL', name: 'All'},
    {category: 'pooja_range', name: 'Pooja Range'},
    {category: 'tissue_range', name: 'Tissue Range'},
    {category: 'cleaning_range', name: 'Cleaning Range'},
    {category: 'aluminum_foil', name: 'Aluminum Foil'},
    {category: 'food_wrapping_paper', name: 'Food Wrapping Paper'},
    {category: 'institution_range', name: 'Institution Range'},
  ];
  const handlePress = category => {
    setSelectedCategory(category);
    getProductByCategory(selectedCategory);

  };


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([getProductByCategory(selectedCategory)]).finally(() =>
      setRefreshing(false),
    );
  }, [selectedCategory]);

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.productItem}>
        <CommonProduct item={item} />
      </View>
    ),
    [],
  );

  return (
    <View style={CommonStyles.container}>
      <BackButton
        text="All Product"
        left
        cart
        cartLenght={cartRes?.data?.length}
        passParameter={selectedCategory}
      />
      <AllCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onPress={handlePress}
      />

      {allProductRes?.loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : allProductRes?.error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {allProductRes.error?.response?.data?.message ||
              'An error occurred. Please try again later.'}
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
                data={allProduct}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                columnWrapperStyle={styles.columnWrapper}
                renderItem={renderItem}
                keyExtractor={(item, index) =>
                  item?.id?.toString() || index.toString()
                }
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                  <View style={styles.errorContainer}>
                    <Text style={[styles.errorText,{color:Colors.black}]}>
                      ---- No Data Found ---
                    </Text>
                  </View>
                }
              />
            </View>
          )}
          ListFooterComponent={<View style={{height: 20}} />}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
    marginTop:50
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

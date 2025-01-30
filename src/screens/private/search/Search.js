/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  FlatList,
  View,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import SearchBar from '../../../components/AppComponent/SearchBox';
import {useActions} from '../../../hooks/useActions';
import {CommonStyles} from '../../../themes/CommonStyles';
import {BackButton, CommonProduct} from '../../../components';

const Search = ({allProductRes}) => {
  const allProduct = allProductRes?.data?.items || [];
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory] = useState('ALL');
  const [searchValue, setSearchValue] = useState();

  const filteredProducts = useMemo(() => {
    return allProduct.filter(product => 
      (product?.name?.toLowerCase().includes(searchValue?.toLowerCase() ?? '') ||
       product?.category?.toLowerCase().includes(searchValue?.toLowerCase() ?? ''))
    );
  }, [allProduct, searchValue]); 
  // console.log("filteredProducts length==>>", JSON.stringify(filteredProducts.length,null,2));
  // console.log("searchValue length==>>", searchValue);

  const {getProductByCategory} = useActions();

  useEffect(() => {
    getProductByCategory(selectedCategory);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getProductByCategory(selectedCategory);
    setRefreshing(false);
  }, [getProductByCategory, selectedCategory]);

  const renderItem = useCallback(({item}) => (
    <View style={styles.productItem}>
      <CommonProduct item={item} />
    </View>
  ));

  return (
    <View style={[CommonStyles.container]}>
      <BackButton  text="Search" />
      <SearchBar
        placeholder="Search your product categories here..."
        value={searchValue}
        editable={true}
        onChangeText={setSearchValue}
        clearValue={() => setSearchValue('')}
      />
      {allProductRes?.loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id || index.toString()}
          ListEmptyComponent={
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>---- No Data Found ---</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={<View style={{height: 20}} />}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  allProductRes: state?.getProductCategoryReducer,
});

export default connect(mapStateToProps)(Search);

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
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  productItem: {
    flex: 1,
    alignItems: 'center',
  },
});

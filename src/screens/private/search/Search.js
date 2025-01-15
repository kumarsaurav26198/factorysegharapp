import { FlatList, View, RefreshControl } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { CommonStyles } from '../../../themes/CommonStyles';
import { useActions } from '../../../hooks/useActions';
import { connect } from 'react-redux';
import SearchBar from '../../../components/AppComponent/SearchBox';
import { ProductContainer } from '../../../container';

const Search = ({}) => {
  const { fetchLoginUser } = useActions();
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = useCallback(() => {
    return (
      <>
      <SearchBar placeholder="Search your products categories here..."/>
      <ProductContainer/>
      <ProductContainer/>
      <ProductContainer/>
      </>
    );
  }, []);

  useEffect(() => {
    fetchLoginUser();
  }, [fetchLoginUser]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLoginUser(); 
    setRefreshing(false);
  }, [fetchLoginUser]);

  return (
    <View style={[CommonStyles.container,{paddingTop:25}]}>
      <FlatList
        data={[1]} 
        showsVerticalScrollIndicator={false}
        renderItem={renderItem} 
        ListFooterComponent={<View style={{ height: 20 }} />} 
        keyExtractor={(item, index) => index.toString()} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> 
        }
      />
    </View>
  );
};

const mapStateToProps = state => ({
  verifyRes: state?.verifyReducers?.data,
});
export default connect(mapStateToProps)(Search);
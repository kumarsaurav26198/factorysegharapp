/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, View, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import {CommonStyles} from '../../../themes/CommonStyles';
import {AllCategories, HeaderWithOption, HomeBanner} from '../../../components';
import SearchBar from '../../../components/AppComponent/SearchBox';
import {ProductContainer} from '../../../container';
import {useActions} from '../../../hooks/useActions';

const Home = () => {
  const {getProductByCategory,fetchLoginUser} = useActions();
  const verifyRes = useSelector(state => state?.verifyReducers);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

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
  };

  useEffect(() => {
    getProductByCategory(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    fetchLoginUser()
    // getProductByCategory(selectedCategory);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getProductByCategory(selectedCategory);
    fetchLoginUser()
    setRefreshing(false);
  }, [selectedCategory]);

  return (
    <View style={[CommonStyles.container, {paddingTop: 0}]}>
      <FlatList
        data={[1]}
        renderItem={() => (
          <>
            <SearchBar placeholder="Search your products categories here..." />
            <HomeBanner />
            <AllCategories
              categories={categories}
              selectedCategory={selectedCategory}
              onPress={handlePress}
            />
            <HeaderWithOption
              title="Your Go-to Items"
              rightArrow
              title2="See All"
              category={selectedCategory}
            />
            <ProductContainer />
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={<View style={{height: 20}} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;
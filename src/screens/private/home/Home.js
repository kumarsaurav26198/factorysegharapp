import { FlatList, View, RefreshControl } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CommonStyles } from '../../../themes/CommonStyles';
import Header from '../../../layout/Header';
import {
  BackButton,
  DriverInfo,
  DriverInfo2,
  DriverInfo3,
  HeaderWithOption,
  HomeBanner,
  OnGoingBookings,
  RecommendedBookings,
  SelectWorkingHours,
} from '../../../components';
import { useActions } from '../../../hooks/useActions';
import SearchBar from '../../../components/AppComponent/SearchBox';
import { ProductIcon } from '../../../assets/icons';
import { ProductContainer } from '../../../container';

const Home = () => {
  const { fetchLoginUser } = useActions();
  const loginRes = useSelector((state) => state?.loginReducers?.data);
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = useCallback(() => {
    return (
      <>
        <SearchBar placeholder="Search your products categories here..." />
        <HomeBanner />
        <HeaderWithOption title="Your Go-to Items" rightArrow title2="See All" />
        <ProductContainer />
        <HeaderWithOption title="Explore by Categories" rightArrow title2="See All" />
        <ProductContainer />
      </>
    );
  }, []);

  useEffect(() => {
    if (loginRes?.email) {
      fetchLoginUser({ email: loginRes?.email });
    }
  }, [fetchLoginUser, loginRes?.email]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (loginRes?.email) {
      fetchLoginUser({ email: loginRes?.email });
    }
    setRefreshing(false);
  }, [fetchLoginUser, loginRes?.email]);

  return (
    <View style={[CommonStyles.container, { paddingTop: 0 }]}>
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

export default Home;

import {FlatList, RefreshControl, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {CommonStyles} from '../../../themes/CommonStyles';
import {BackButton, HistoryCard} from '../../../components';
import {connect} from 'react-redux';
import {useActions} from '../../../hooks/useActions';

const History = ({loginRes, orderHistoryRes}) => {
  const {fetchUserHistoryOrder} = useActions();
  const [refreshing, setRefreshing] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (loginRes?.email && isFirstLoad) {
      fetchUserHistoryOrder({userEmail: loginRes.email});
      setIsFirstLoad(false);
    }
  }, [fetchUserHistoryOrder, loginRes?.email, isFirstLoad]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (loginRes?.email) {
      await fetchUserHistoryOrder({userEmail: loginRes.email});
    }
    setRefreshing(false);
  }, [fetchUserHistoryOrder, loginRes?.email]);

  const renderItem = useCallback(({item}) => <HistoryCard item={item} />, []);

  const renderEmptyList = () => (
    <View style={{alignItems: 'center', marginTop: 50}}>
      <Text>----No Order History Found ----</Text>
    </View>
  );

  return (
    <View style={CommonStyles.container}>
      <BackButton left text="Order History" />
      <FlatList
        data={orderHistoryRes?.data || []}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const mapStateToProps = state => ({
  loginRes: state?.loginReducers?.data,
  orderHistoryRes: state?.orderHistoryReducers,
});

export default connect(mapStateToProps)(History);

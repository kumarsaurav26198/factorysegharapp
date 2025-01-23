/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, RefreshControl, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {CommonStyles} from '../../../themes/CommonStyles';
import {BackButton, HistoryCard} from '../../../components';
import {connect} from 'react-redux';
import {useActions} from '../../../hooks/useActions';

const History = ({orderHistoryRes}) => {
  const {fetchUserHistoryOrder} = useActions();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUserHistoryOrder();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchUserHistoryOrder();
    setRefreshing(false);
  }, [fetchUserHistoryOrder]);

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
  orderHistoryRes: state?.orderHistoryReducers,
});

export default connect(mapStateToProps)(History);

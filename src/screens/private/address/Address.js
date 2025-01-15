import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { BackButton, C_Button } from '../../../components';
import Colors from '../../../themes/Colors';
import { connect } from 'react-redux';
import { CommonStyles } from '../../../themes/CommonStyles';
import { useActions } from '../../../hooks/useActions';
import { AddAddress, AddSuccess, ModalWrapper } from '../../../components/Modal';

const Address = ({ userRes, addressRes }) => {
  const email = "magenet2@example.com";
  console.log("addressRes", addressRes);

  const { fetchUserAddress } = useActions();
  const [refreshing, setRefreshing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };

  useEffect(() => {
    if (email) fetchUserAddress({ email });
  }, [fetchUserAddress, email]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (email) fetchUserAddress({ email });
    setRefreshing(false);
  }, [fetchUserAddress, email]);

  const handleEdit = (item) => {
    console.log("Edit Address:", item);
  };

  const handleDelete = (item) => {
    console.log("Delete Address:", item);
  };

  const renderItem = ({ item }) => (
    <View style={styles.addressItem}>
      <View style={styles.addressIcon}>
        <Text style={styles.addressIconText}>{item.type[0]}</Text>
      </View>
      <View style={styles.addressDetails}>
        <Text style={styles.addressType}>{item.type}</Text>
        <Text style={styles.addressText} numberOfLines={2}>
          {item.address}
        </Text>
      </View>
      <View style={styles.actionIcons}>
        {/* <TouchableOpacity onPress={() => handleEdit(item)} style={styles.iconButton}>
          <EditIcon/>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => handleDelete(item)} style={styles.iconButton}>
        <Close/>
        </TouchableOpacity> */}
      </View>
    </View>
  );

  const addresses = [
    { type: 'Home', address: '123 Main St, Apt 4B, Cityville, State 12345' },
    { type: 'Work', address: '456 Office Blvd, Suite 789, Business Park, State 67890' },
  ];

  const renderEmptyList = () => (
    <View style={{ alignItems: 'center', marginTop: 50 }}>
      <Text>---- No Address Found ----</Text>
    </View>
  );

  return (
    <View style={CommonStyles.container}>
      <BackButton left text="Address" />
      <FlatList
        data={addresses}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => `address-${index}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={<View style={{ height: 20 }} />}
        ListEmptyComponent={renderEmptyList}
      />
      <View style={[CommonStyles.bottomView, { padding: 15 }]}>
        <C_Button title="Add new address" onPress={toggleModal} />
      </View>
      <ModalWrapper
        visible={isModalVisible}
        onRequestClose={toggleModal}
        >
        <AddAddress handlePressClose ={toggleModal} handlePressDone={toggleModal}/>
      </ModalWrapper>
    </View>
  );
};

const mapStateToProps = (state) => ({
  userRes: state?.userReducers?.data,
  addressRes: state?.addressReducers?.data,
});

export default connect(mapStateToProps)(Address);

const styles = StyleSheet.create({
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightGray,
    backgroundColor: Colors.lightBlue,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addressIconText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  addressDetails: {
    flex: 1,
  },
  addressType: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: Colors.gray,
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 10,
  },
});

import {
  FlatList,
  View,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {CommonStyles} from '../../../themes/CommonStyles';
import {useActions} from '../../../hooks/useActions';
import {connect} from 'react-redux';
import Colors from '../../../themes/Colors';
import {BackButton} from '../../../components';
import {CartListCon} from '../../../container';
import {AddSuccess, BookingCancelled, ModalWrapper, OrderConfirmation} from '../../../components/Modal';
import { navigate } from '../../../services/navigationService';

const CartScreen = ({cartRes}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const {fetchLoginUser} = useActions();
  const [refreshing, setRefreshing] = useState(false);
  // console.log("cartRes",JSON.stringify(cartRes?.data,null,2))
  const itemTotal = cartRes?.data?.reduce((total, item) => {
    return total + (item.quantity * item.price);
  }, 0);
  const deliveryFee = 0; 
  const deliveryFeeDiscount = deliveryFee; // Assume full discount on delivery fee
  const totalPayable = itemTotal - deliveryFeeDiscount;

  const renderItem = useCallback((item) => {
    // console.log("item",JSON.stringify(item,null,2))
    return (
      <>
        <CartListCon item={item?.item} />
      </> 
    );
  }, []);

  const renderFooter = () => {


    return (
      <View style={styles.footerContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Item Total</Text>
          <Text style={styles.summaryValue}>₹{itemTotal}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, styles.discountText]}>
            Delivery Fee (₹{deliveryFeeDiscount} Saved)
          </Text>
          <Text style={[styles.summaryValue, styles.discountText]}>₹0</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, styles.totalText]}>
            Total Payable
          </Text>
          <Text style={[styles.summaryValue, styles.totalText]}>
            ₹{totalPayable}
          </Text>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={toggleModal}>
          <Text style={styles.payButtonText}>
            Continue to pay ₹{totalPayable}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    fetchLoginUser();
  }, [fetchLoginUser]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLoginUser();
    setRefreshing(false);
  }, [fetchLoginUser]);

  return (
    <View style={[CommonStyles.container]}>
      <BackButton left text={`Cart (${cartRes?.data?.length})`} />
      <FlatList
        data={cartRes?.data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <ModalWrapper
        visible={isModalVisible}
        onRequestClose={toggleModal}
        center={false}>
        <OrderConfirmation
        itemTotal={itemTotal}
        deliveryFee={deliveryFee}
        totalPayable={totalPayable}
          handlePressClose={()=>{toggleModal()}}
          handlePressOrderConfirmation={()=>{toggleModal()
            navigate("OrderConfirmation",{totalPayable})
          }}
        />
      </ModalWrapper>
    </View>
  );
};

const mapStateToProps = state => ({
  verifyRes: state?.verifyReducers?.data,
  cartRes: state?.cartReducers,

});

export default connect(mapStateToProps)(CartScreen);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
  },
  footerContainer: {
    backgroundColor: Colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#000',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  discountText: {
    color: Colors.primary, // Customize to your discount text color
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  payButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

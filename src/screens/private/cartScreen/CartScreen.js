/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useActions } from '../../../hooks/useActions';
import Colors from '../../../themes/Colors';
import { BackButton } from '../../../components';
import { CommonStyles } from '../../../themes/CommonStyles';
import { CartListCon } from '../../../container';
import { ModalWrapper, OrderConfirmation } from '../../../components/Modal';

const CartScreen = ({ cartRes }) => {
  const { getCartRequest } = useActions();
  const cartData = cartRes?.data?.cartItems || [];
  const [refreshing, setRefreshing] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const [cartItems, setCartItems] = useState(cartData);

  useEffect(() => {
    if (cartData.length) {
      setCartItems(cartData);
    }
  }, [cartData]);

  useEffect(() => {
    getCartRequest();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getCartRequest();
    setRefreshing(false);
  }, [getCartRequest]);

  const incrementQuantity = useCallback((index) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, quantity: item.quantity + 1 } // Increase quantity
          : item
      )
    );
  }, []);
  
  const decrementQuantity = useCallback((index) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, item, i) => {
        if (i === index) {
          if (item.quantity > 1) {
            // Decrease quantity if it's greater than 1
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          // Add other items unchanged
          acc.push(item);
        }
        return acc;
      }, [])
    );
  }, []);
  
  
  

  const itemTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFee = 0;
  const deliveryFeeDiscount = deliveryFee;
  const totalPayable = itemTotal - deliveryFeeDiscount;

  const renderItem = useCallback(
    ({ item, index }) => (
      <CartListCon
        item={item}
        index={index} // Pass the index
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />
    ),
    [incrementQuantity, decrementQuantity]
  );

  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Item Total</Text>
          <Text style={styles.summaryValue}>₹{itemTotal.toFixed(2)}</Text>
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
            ₹{totalPayable.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={()=>{
          console.log("cartItems===>>>",JSON.stringify(cartItems,null,2))
          toggleModal()
        }}>
          <Text style={styles.payButtonText}>
            Continue to pay ₹{totalPayable.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[CommonStyles.container]}>
      <BackButton left text={`Cart (${cartItems.length})`} />
      <FlatList
        data={cartItems}
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
        center={false}
      >
        <OrderConfirmation
          itemTotal={itemTotal}
          deliveryFee={deliveryFee}
          totalPayable={totalPayable}
          handlePressClose={toggleModal}
          handlePressOrderConfirmation={() => {
            toggleModal();
          }}
        />
      </ModalWrapper>
    </View>
  );
};

const mapStateToProps = (state) => ({
  cartRes: state?.cartReducers,
});

export default connect(mapStateToProps)(CartScreen);

const styles = StyleSheet.create({
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
    color: Colors.primary,
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

/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useActions} from '../../../hooks/useActions';
import Colors from '../../../themes/Colors';
import {BackButton, C_Button, C_SmallButton} from '../../../components';
import {CommonStyles} from '../../../themes/CommonStyles';
import {CartListCon} from '../../../container';
import {ModalWrapper, OrderConfirmation} from '../../../components/Modal';
import {navigate} from '../../../services/navigationService';

const CartScreen = ({cartRes, userRes,addressRes}) => {
  const {getCartRequest} = useActions();
  const cartData = cartRes?.data?.cartItems || [];
  const cashback = userRes[0]?.cashback || 0;

  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState(cartData);

  const toggleModal = () => setIsModalVisible(!isModalVisible);

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

  const incrementQuantity = useCallback(index => {
    setCartItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  }, []);

  const decrementQuantity = useCallback(index => {
    setCartItems(prevItems =>
      prevItems.reduce((acc, item, i) => {
        if (i === index) {
          if (item.quantity > 1) {
            acc.push({...item, quantity: item.quantity - 1});
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []),
    );
  }, []);

  const itemTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const specialDiscount = itemTotal >= 2500 ? 1250 : 0;
  const deliveryFee = 0;
  const deliveryFeeDiscount = deliveryFee;
  const totalPayable = Math.max(
    itemTotal - deliveryFeeDiscount - cashback - specialDiscount,
    0,
  );

  const renderItem = useCallback(
    ({item, index}) => (
      <CartListCon
        item={item}
        index={index} // Pass the index
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />
    ),
    [incrementQuantity, decrementQuantity],
  );

  return (
    <View style={[CommonStyles.container]}>
      <BackButton left text={`Cart (${cartItems.length})`} />
      <FlatList
        data={cartItems}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>---- No Data Found In Cart ---</Text>
            <C_SmallButton
              title="Shop Now"
              onPress={() => {
                navigate('BottomNavigator');
              }}
            />
          </View>
        }
        ListFooterComponent={<View style={{height: 340}} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      {cartItems?.length > 0 ? (
        <View style={[CommonStyles.bottomView]}>
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
            {cashback > 0 && (
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, styles.cashbackText]}>
                  Cashback Applied
                </Text>
                <Text style={[styles.summaryValue, styles.cashbackText]}>
                  -₹{cashback.toFixed(2)}
                </Text>
              </View>
            )}
            {specialDiscount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, styles.discountText]}>
                  Special Discount (on ₹2500+)
                </Text>
                <Text style={[styles.summaryValue, styles.discountText]}>
                  -₹{specialDiscount.toFixed(2)}
                </Text>
              </View>
            )}
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, styles.discountText]}>
                Select Address
              </Text>
              <Text
              onPress={()=>{
                navigate("Address")
              }}
                style={[
                  styles.summaryValue,
                  styles.discountText,
                  {color: 'blue', textDecorationLine: 'underline'},
                ]}>
                Change Address
              </Text>
            </View>
            <Text style={[styles.summaryLabel, styles.discountText]} numberOfLines={1}>
                Selected Address:- 
                `{`  "address": {
          "name": "John Doe",
          "phone": "9876543210",
          "addressLine1": "123 Main Street",
          "addressLine2": "Apt 4B",
          "landMark": "Near Central Park",
          "city": "New York",
          "state": "NY",
          "pinCode": "10001",
          "country": "USA"
        }`}`
              </Text>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={[styles.summaryLabel, styles.totalText]}>
                Total Payable
              </Text>
              <Text style={[styles.summaryValue, styles.totalText]}>
                ₹{totalPayable.toFixed(2)}
              </Text>
            </View>
          </View>
          <C_Button
            title={`Continue to pay ₹${totalPayable.toFixed(2)}`}
            onPress={() => {
              console.log(
                'cartItems===>>>',
                JSON.stringify(cartItems, null, 2),
              );
              toggleModal();
            }}
          />
        </View>
      ) : (
        ''
      )}
      <ModalWrapper
        visible={isModalVisible}
        onRequestClose={toggleModal}
        center={false}>
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

const mapStateToProps = state => ({
  cartRes: state?.cartReducers,
  userRes: state?.userReducers?.data,
  addressRes: state?.addressReducers?.data,
  
});

export default connect(mapStateToProps)(CartScreen);

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: Colors.bgColor,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    width: '100%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  errorText: {
    color: Colors.black,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.darkGray,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  discountText: {
    color: Colors.primary,
  },
  cashbackText: {
    color: Colors.green,
    fontWeight: 'bold',
  },
  totalRow: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.borderGray,
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
});

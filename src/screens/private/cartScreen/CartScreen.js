/* eslint-disable react-hooks/exhaustive-deps */
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useActions} from '../../../hooks/useActions';
import Colors from '../../../themes/Colors';
import {
  Address_DropDown,
  BackButton,
  C_Button,
  C_SmallButton,
} from '../../../components';
import {CommonStyles} from '../../../themes/CommonStyles';
import {CartListCon} from '../../../container';
import {ModalWrapper, OrderConfirmation} from '../../../components/Modal';
import {navigate} from '../../../services/navigationService';
import RazorpayCheckout from 'react-native-razorpay';
import {EditIcon} from '../../../assets/icons';
import {capitalizeFirstLetter} from '../../../utils/validators';

const CartScreen = ({cartRes, userRes, addressRes}) => {
  const {getCartRequest,placeOderReq} = useActions();
  const cartData = cartRes?.data?.cartItems || [];
  const cashback = userRes[0]?.cashback || 0;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [cartItems, setCartItems] = useState(cartData);
  const [ errorMessage, setErrorMessage ] = useState('');

  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const addtoggleModal = () => setIsAddVisible(!isAddVisible);

  useEffect(() => {
    if (cartData.length) {
      setCartItems(cartData);
    }
  }, [cartData]);

  useEffect(() => {
    if (addressRes) {
      setSelectedIndex(addressRes[0]);
      setErrorMessage('');
    }
  }, [addressRes]);

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

  const handlePressOrderConfirmation = ()=>{
    if (selectedIndex) {
      const payload = {
        customerName: userRes[0]?.fullName,
        mobile: userRes[0]?.mobile,
        items: cartItems.map(item => ({
          productName: item.productName,
          productDetail: {
            variants: item?.productDetail?.variants || '',
            sku: item?.productDetail?.sku || '',
            caseSize: item?.productDetail?.caseSize || '',
          },
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: totalPayable.toFixed(2),
        cashbackUsed: cashback.toFixed(2),
        address: {
          name: selectedIndex.name,
          email: selectedIndex.email,
          phone: selectedIndex.phone,
          addressLine1: selectedIndex?.addressLine1 || '',
          addressLine2: selectedIndex?.addressLine2 || '',
          landMark: selectedIndex?.addressLine2 || '',
          city: selectedIndex?.city || '',
          state: selectedIndex?.state || '',
          pinCode: selectedIndex?.zipCode || '',
          country: selectedIndex?.country || '',
        },
      };
      placeOderReq(payload);
    } else {
     setErrorMessage('Selected address is missing!');
    }};

  const itemTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const specialDiscount = itemTotal >= 2500 ? itemTotal * 0.5 : itemTotal * 0.2;
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
        index={index}
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
        ListFooterComponent={<View style={{height: 400}} />}
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

            <View style={styles.section}>
              <View style={styles.deliveryAddress}>
                <View style={styles.addressLeft}>
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarText}>📍</Text>
                  </View>
                  <View style={styles.addressDetails}>
                    <Text style={styles.deliveryTitle}>
                      Delivery Address{' '}
                      <Text
                        onPress={() => {
                          selectedIndex ? addtoggleModal() :
                          navigate('Address');
                        }}
                        style={[
                          {color: 'blue', textDecorationLine: 'underline'},
                        ]}>
                       {selectedIndex ? ('(Change)') : ('(Add Address ➡️)')}
                      </Text>
                    </Text>
                    {
                      selectedIndex ?  <Text style={styles.addressText} numberOfLines={2}>
                      {capitalizeFirstLetter(selectedIndex?.name)},
                      {selectedIndex?.addressLine1}, {selectedIndex?.addressLine2}, {selectedIndex?.city}
                      {selectedIndex?.state}, {selectedIndex?.country},{' '}
                      {selectedIndex?.phone}
                    </Text> : null}
                  </View>
                  <TouchableOpacity onPress={() => navigate('Address')}>
                    <EditIcon />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {errorMessage ? <Text style={CommonStyles.errorText}>{errorMessage}</Text> : null}
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
              if (selectedIndex !== null && selectedIndex !== undefined) {
                setErrorMessage('');
                toggleModal();
              } else {
                setErrorMessage('Select address');
              }
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
        errorMessage={errorMessage}
          itemTotal={itemTotal.toFixed(2)}
          deliveryFee={deliveryFee.toFixed(2)}
          totalPayable={totalPayable.toFixed(2)}
          handlePressClose={toggleModal}
          address={selectedIndex}
          handlePressOrderConfirmation={() => {
            handlePressOrderConfirmation();


            // var options = {
            //   description: 'Credits towards consultation',
            //   image: Images.banner,
            //   currency: 'INR',
            //   key: 'rzp_test_xC0HuBfFYisteo',
            //   amount: itemTotal,
            //   name: 'Factory Se Ghar',
            //   order_id: '', // Replace this with an order_id created using Orders API.
            //   prefill: {
            //     email: 'gaurav.kumar@example.com',
            //     contact: '916202142166',
            //     name: 'Saurav Kumar',
            //   },
            //   theme: {color: Colors.red},
            // };

            // RazorpayCheckout.open(options)
            //   .then(data => {
            //     navigate('BottomNavigator');
            //     // Alert.alert(`Success: ${data.razorpay_payment_id}`);
            //   })
            //   .catch(error => {
            //     console.log('error',JSON.stringify(error,null,2));
            //     setErrorMessage('Payment Failed');
            //     // setErrorMessage(`Error: ${error.code} | ${error.description}`)
            //   });
            // toggleModal();
          }}
        />
      </ModalWrapper>
      <ModalWrapper
        visible={isAddVisible}
        onRequestClose={addtoggleModal}
        center={false}>
        <Address_DropDown
          addressRes={addressRes}
          handlePressClose={addtoggleModal}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          handlePressDone={selectedIndex => {
            setSelectedIndex(selectedIndex);
            setErrorMessage('');
            addtoggleModal();
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
  section: {
    // marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    // paddingBottom: 20,
  },
  addressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deliveryAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
  },
  addressDetails: {
    marginLeft: 12,
    flex: 1,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
  },
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
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
});

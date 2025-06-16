import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { BackButton } from '../../../components';
import { connect } from 'react-redux';
import { useActions } from '../../../hooks/useActions';
import { ModalWrapper, PaymentSuccess } from '../../../components/Modal';
import { reset } from '../../../services/navigationService';

const OrderConfirmation = ({ route, cartRes, verifyRes, placeOderRes }) => {
  console.log("placeOderRes", JSON.stringify(placeOderRes, null, 2));
  const { placeOderReq } = useActions();
  const { totalPayable } = route.params;
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const payload = (cartRes, verifyRes) => {
    return {
      items: cartRes.data.map(item => ({
        itemId: item.itemId,
        quantity: item.quantity,
      })),
      userEmail: verifyRes?.email,
      "address": {
        "name": "test",
        "phone": "+1234567890",
        "addressLine1": "123 Main St",
        "addressLine2": "Apt 4B",
        "city": "Springfield",
        "state": "Illinois",
        "zipCode": "62701",
        "country": "USA"
      }
    };
  };

  return (
    <View style={styles.container}>
      <BackButton left text="Order Confirmation" />
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preffered methods</Text>

          <TouchableOpacity style={styles.paymentOption}>
            <Image
              source={{
                uri: 'https://raw.githubusercontent.com/kristiyanP/creditcard-generator/master/src/main/resources/mc.png',
              }}
              style={styles.cardIcon}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentTitle}>Credit card</Text>
              <Text style={styles.paymentSubtext}>2441 **** **** 4567</Text>
            </View>
            <View style={styles.radioSelected}>
              <View style={styles.radioInner} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentOption}>
            <Image
              source={{
                uri: 'https://raw.githubusercontent.com/kristiyanP/creditcard-generator/master/src/main/resources/visa.png',
              }}
              style={styles.cardIcon}
            />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentTitle}>Credit card</Text>
              <Text style={styles.paymentSubtext}>2441 **** **** 4567</Text>
            </View>
            <View style={styles.radio} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>UPI, Cards & Other Methods</Text>

          <TouchableOpacity style={styles.paymentOption}>
            <View style={styles.upiIcon}>
              <Text>UPI</Text>
            </View>
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentTitle}>UPI</Text>
              <Text style={styles.paymentSubtext}>
                Pay with your upi UPI apps or choose other
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.upiGrid}>
            <TouchableOpacity style={styles.upiItem}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png',
                }}
                style={styles.upiAppIcon}
              />
              <Text style={styles.upiAppText}>Google Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.upiItem}>
              <Image
                source={{
                  uri: 'https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png',
                }}
                style={styles.upiAppIcon}
              />
              <Text style={styles.upiAppText}>PhonePe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.upiItem}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png',
                }}
                style={styles.upiAppIcon}
              />
              <Text style={styles.upiAppText}>Paytm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.upiItem}>
              <View style={styles.upiIcon}>
                <Text>UPI</Text>
              </View>
              <Text style={styles.upiAppText}>Other UPI</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.paymentOption}>
            <View style={[ styles.methodIcon, styles.codIcon ]}>
              <Text>₹</Text>
            </View>
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentTitle}>Cash on delivery</Text>
              <Text style={styles.paymentSubtext}>
                Pay at the time of delivery
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <View style={[ styles.methodIcon, styles.bankIcon ]}>
              <Text>🏦</Text>
            </View>
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentTitle}>Net banking</Text>
              <Text style={styles.paymentSubtext}>All Indian banks</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentOption}>
            <View style={[ styles.methodIcon, styles.walletIcon ]}>
              <Text>👝</Text>
            </View>
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentTitle}>Wallet</Text>
              <Text style={styles.paymentSubtext}>All Indian banks</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.addressSection}>
          <View style={styles.addressHeader}>
            <View style={styles.addressLeft}>
              <View style={styles.avatarCircle}>
                <Text>👤</Text>
              </View>
              <View style={styles.addressDetails}>
                <Text style={styles.addressLabel}>Delivery Address</Text>
                <Text style={styles.addressText} numberOfLines={1}>
                  Shreekar road rajendra nagar 98...
                </Text>
              </View>
            </View>
            <TouchableOpacity></TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹ {totalPayable}</Text>
          <TouchableOpacity>
            <Text style={styles.viewDetails}>View details</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            // console.log("cartRes",JSON.stringify(cartRes,null,2))
            placeOderReq(payload(cartRes, verifyRes));
            // toggleModal();
          }}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
      <ModalWrapper
        visible={isModalVisible}
        onRequestClose={toggleModal}
        center={true}>
        <PaymentSuccess
          amount={totalPayable}
          handlePressClose={() => {
            toggleModal();
            reset([ { name: 'BottomNavigator' } ]);
          }}
          handlePressDone={() => {
            toggleModal();
            reset([ { name: 'BottomNavigator' } ]);
          }}
        />
      </ModalWrapper>
    </View>
  );
};
const mapStateToProps = state => ({
  cartRes: state?.cartReducers,
  verifyRes: state?.loginReducers?.data,
  placeOderRes: state?.placeOderReducers,
});
export default connect(mapStateToProps)(OrderConfirmation);

// export default OrderConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#8B0000',
    paddingTop: 40,
    paddingBottom: 15,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cardIcon: {
    width: 40,
    height: 25,
    resizeMode: 'contain',
  },
  paymentDetails: {
    flex: 1,
    marginLeft: 12,
  },
  paymentTitle: {
    fontSize: 16,
    color: '#333',
  },
  paymentSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8B0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B0000',
  },
  upiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginBottom: 16,
  },
  upiItem: {
    width: '25%',
    alignItems: 'center',
    marginVertical: 8,
  },
  upiAppIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  upiAppText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  upiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codIcon: {
    backgroundColor: '#FFE4E1',
  },
  bankIcon: {
    backgroundColor: '#E6E6FA',
  },
  walletIcon: {
    backgroundColor: '#F0FFF0',
  },
  addressSection: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressDetails: {
    marginLeft: 12,
    flex: 1,
  },
  addressLabel: {
    fontSize: 14,
    color: '#666',
  },
  addressText: {
    fontSize: 16,
    color: '#333',
    marginTop: 2,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  continueButton: {
    backgroundColor: '#8B0000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

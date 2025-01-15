import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CommonStyles} from '../../../themes/CommonStyles';
import BookingMap from '../../../layout/BookingMap';
import {C_Button, C_SmallButton, LocationSelector2} from '../../../components';
import {RecommendedCon} from '../../../container';
import Colors from '../../../themes/Colors';
import {ProfileIcon, WalletIcon, WalletIcon3} from '../../../assets/icons';
import {FontSize, FontsWeights} from '../../../themes/Fonts';
import {ModalWrapper, TotalFareModal} from '../../../components/Modal';

const BookRide = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={CommonStyles.container}>
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <>
              <BookingMap />
              <View style={styles.loco}>
                <LocationSelector2 clock  startEditable={false} endEditable={false}/>
              </View>
              <View style={styles.loco}>
                <RecommendedCon />
              </View>
            </>
          );
        }}
        ListFooterComponent={<View style={{height: 150}} />}
      />
      <View style={CommonStyles.bottomView}>
        <C_SmallButton
          disabled={true}
          title="You have just saved ₹8 with this ride"
          style={styles.fullWidthButton}
        />
        <View style={styles.iconRowContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={()=>{navigation.navigate("PayOption")}}>
            <WalletIcon3 width={30} height={30} />
            <Text style={styles.leftText}>Setup Payment</Text>
          </TouchableOpacity>
          <View style={styles.centerBorder} />
          <TouchableOpacity style={styles.iconContainer}>
            <ProfileIcon width={27} height={27} />
            <Text style={styles.leftText}>My self</Text>
          </TouchableOpacity>
        </View>
        <C_Button title="Book Bike" onPress={toggleModal} />
      </View>
      <ModalWrapper visible={isModalVisible} onRequestClose={toggleModal}>
        <TotalFareModal
          handlePressProceed={() => {
            toggleModal();
            navigation.navigate('FindingCars');
          }}
        />
      </ModalWrapper>
    </View>
  );
};
export default BookRide;

const styles = StyleSheet.create({
  loco: {
    zIndex: 3,
    top: -20,
  },
  fullWidthButton: {
    width: '100%',
  },
  iconRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginVertical: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerBorder: {
    width: 1,
    height: 30,
    backgroundColor: '#ccc',
    marginHorizontal: 20,
  },
  leftText: {
    fontWeight: FontsWeights.FW600,
    fontSize: FontSize.FS14,
    color: Colors.black,
    marginLeft: 10,
  },
});

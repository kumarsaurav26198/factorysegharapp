import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import {
  AddMoneyIcon,
  BackVerctor,
  Calling,
  CartIcon,
  DoneIcon,
  Humburg,
  ProfileIcon,
  SettingsIcon,
} from '../../assets/icons';
import Colors from '../../themes/Colors';
import { FontsFamilies, FontSize, FontsWeights } from '../../themes/Fonts';

function BackButton({
  text,
  cart,
  cartLenght,
  drawer,
  left,
  setting,
  handlePressDrawer,
  myself,
  Driver,
  handlePressDriver,
  addMoney,
  bottomBorder,
  cancelRide,
  cashback
}) {
  const navigation = useNavigation();

  const handlePressBack = () => {
    navigation.goBack();
  };
  const handlePresscancelRide = () => {
    // navigation.goBack();
  };
  const handlePressHumburg = () => {
    console.log('handlePressHumburg');
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handlePressSetting = () => {
    navigation.navigate('Setting');
  };
  const handlePressCart = () => {
    navigation.navigate('CartScreen');
  };
  const handlePressMySelf = () => {
    // navigation.navigate('Settings');
  };
  const handlePressAddMoney = () => {
    navigation.navigate('AddAmount');
  };

  return (
    <View
      style={[
        styles.outerContainer,
        bottomBorder && { borderBottomWidth: 0.3, borderBottomColor: 'gray' },
      ]}>
      <View style={styles.leftContainer}>
        {drawer && (
          <TouchableOpacity
            onPress={handlePressDrawer}
            style={[ styles.iconContainer ]}>
            <BackVerctor />
          </TouchableOpacity>
        )}
        {left && (
          <TouchableOpacity
            onPress={handlePressBack}
            style={styles.iconContainer}>
            <BackVerctor fill="#000" />
          </TouchableOpacity>
        )}
        {cancelRide && (
          <TouchableOpacity
            onPress={handlePressBack}
            style={styles.iconContainer}>
            <Humburg height={30} width={30} />
          </TouchableOpacity>
        )}
        <Text style={styles.headText} onPress={handlePressBack}>
          {text}
        </Text>
      </View>
      {setting && (
        <TouchableOpacity
          onPress={handlePressSetting}
          style={styles.iconContainer}>
          <SettingsIcon />
        </TouchableOpacity>
      )}
      {cart && (
        <TouchableOpacity
          onPress={handlePressCart}
          style={styles.iconContainer}>
          <CartIcon />
          {cartLenght > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartLenght}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
      {
        cashback > 0 ? <Text style={[ styles.headText, {
          fontWeight: FontsWeights.FW400,
          fontSize: FontSize.FS16,
        } ]}>
          Total CashBack : {cashback}
        </Text> : ''
      }
      {Driver && (
        <TouchableOpacity
          onPress={handlePressDriver}
          style={styles.iconContainer}>
          <Calling />
        </TouchableOpacity>
      )}
      {myself && (
        <TouchableOpacity
          onPress={handlePressMySelf}
          style={styles.myselficonContainer}>
          <ProfileIcon width={20} height={20} style={{ left: 5 }} />
          <Text style={styles.leftText}>My self</Text>
        </TouchableOpacity>
      )}
      {addMoney && (
        <TouchableOpacity
          onPress={handlePressAddMoney}
          style={styles.myselficonContainer}>
          <Text style={styles.leftText}>Add Money</Text>
          <AddMoneyIcon width={20} height={20} style={{ left: 5 }} />
        </TouchableOpacity>
      )}
      {cancelRide && (
        <TouchableOpacity style={styles.cancleconContainer}>
          <DoneIcon width={25} height={25} />
          <Text style={styles.confirmText}>Your Ride is confirmed</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default BackButton;

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  headText: {
    fontWeight: FontsWeights.FW600,
    fontSize: FontSize.FS18,
    color: Colors.white,
    marginLeft: 10,
  },
  leftText: {
    fontWeight: FontsWeights.FW600,
    fontSize: FontSize.FS14,
    color: Colors.black,
    marginLeft: 10,
  },
  confirmText: {
    fontWeight: FontsWeights.FW600,
    fontSize: FontSize.FS14,
    color: Colors.black,
    marginLeft: 10,
    alignSelf: 'center',
  },
  iconContainer: {
    // padding: 10, // Adjusted padding for better touch area
  },
  myselficonContainer: {
    flexDirection: 'row',
  },
  cancleconContainer: {
    flexDirection: 'row',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    right: '5%',
  },
  cartBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: Colors.green,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  cartBadgeText: {
    color: Colors.white,
    fontSize: FontSize.FS12,
    fontWeight: FontsWeights.FW700,
  },
});

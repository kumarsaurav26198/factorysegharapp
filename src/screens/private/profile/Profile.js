import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CommonStyles } from '../../../themes/CommonStyles';
import { BackButton, DriverInfo2 } from '../../../components';
import Colors from '../../../themes/Colors';
import {
  AboutIcon, AddressIcon, BackVerctor, ComplainIcon, DriverIcon, EditProfileIcon, Help,
  HistoryIcon, LogoutIcon, ReferralIcon, SettingsIcon
} from '../../../assets/icons';
import { FontSize, FontsWeights } from '../../../themes/Fonts';
import { reset } from '../../../services/navigationService';
import { useActions } from '../../../hooks/useActions';
import { connect } from 'react-redux';

const Profile = ({ navigation,userRes }) => {
  const { logOut } = useActions();

  const menuItems = [
    { title: 'Personal info', navigate: 'EditProfile', icon: EditProfileIcon },
    { title: 'Address', navigate: 'Address', icon: AddressIcon },
    { title: 'History', navigate: 'History', icon: HistoryIcon },
    // { title: 'Complain', navigate: 'Complain', icon: ComplainIcon },
    { title: 'Referral', navigate: 'Referral', icon: ReferralIcon },
    { title: 'About Us', navigate: 'AboutUs', icon: AboutIcon },
    { title: 'Settings', navigate: 'Settings', icon: SettingsIcon },
    { title: 'Help and Support', navigate: 'HelpSupport', icon: Help },
    { title: 'Log Out', navigate: null, icon: LogoutIcon }, 
  ];

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogout = () => {
    logOut();
    reset([{ name: 'SignMobile' }]);
  };

  const handleMenuPress = (item) => {
    if (item.title === 'Log Out') {
      handleLogout();
    } else {
      handleNavigation(item.navigate);
    }
  };

  return (
    <View style={CommonStyles.container}>
      <BackButton text="Profile" left />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => (
          <>
            <View style={styles.infoContainer}>
              <DriverIcon height={45} width={45} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{userRes[0]?.fullName}</Text>
                <Text style={styles.userPhone}>{userRes[0]?.email}</Text>
              </View>
            </View>
          </>
        )}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleMenuPress(item)}
            style={[styles.menuItem, index !== 0 && styles.menuItemBorder]}
            activeOpacity={0.7}
          >
            <item.icon width={24} height={24} />
            <Text style={styles.menuText}>{item.title}</Text>
            <BackVerctor style={styles.rotatedIcon} size={16} color={Colors.black} />
          </TouchableOpacity>
        )}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  );
};


const mapStateToProps = (state) => ({
  userRes: state?.userReducers?.data,
});
export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: FontSize.FS18,
    fontWeight: FontsWeights.FW600,
    color: Colors.black,
  },
  userPhone: {
    fontWeight: FontsWeights.FW500,
    color: Colors.black,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.white,
  },
  menuItemBorder: {
    borderTopWidth: 0.3,
    borderTopColor: Colors.gray,
  },
  menuText: {
    marginLeft: 15,
    fontSize: FontSize.FS16,
    flex: 1, 
    color: Colors.black,
  },
  rotatedIcon: {
    transform: [{ rotate: '180deg' }],
    alignSelf: 'flex-end', 
  },
});

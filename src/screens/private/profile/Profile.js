import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CommonStyles } from '../../../themes/CommonStyles';
import { BackButton, C_Button } from '../../../components';
import Colors from '../../../themes/Colors';
import {
  AboutIcon, AddressIcon, BackVerctor, CartIcon, ContactUsIcon, DriverIcon, EditProfileIcon, Help,
  HistoryIcon, LogoutIcon, Privacy, ReferralIcon,
  TermCondition
} from '../../../assets/icons';
import { FontSize, FontsWeights } from '../../../themes/Fonts';
import { reset } from '../../../services/navigationService';
import { useActions } from '../../../hooks/useActions';
import { connect, useSelector } from 'react-redux';

const Profile = ({ navigation, userRes,kycData }) => {

  const { logOut,sellerRequest } = useActions();
  
  const loginUserData = useSelector((state) => state?.verifyReducers?.data);
    const sellerData = kycData?.data?.seller;
    const kycStatus = sellerData?.kycStatus; 

  const menuItems = [
    // { title: 'Personal info', navigate: 'EditProfile', icon: EditProfileIcon },
    { title: 'Address', navigate: 'Address', icon: AddressIcon },
    { title: "Cart", navigate: 'CartScreen', icon: CartIcon },
    { title: 'History', navigate: 'History', icon: HistoryIcon },
    { title: 'Referral', navigate: 'Referral', icon: ReferralIcon },
    // { title: 'Complain', navigate: 'Complain', icon: ComplainIcon },
    { title: 'About Us', navigate: 'AboutUs', icon: AboutIcon, pagename: "about" },
    { title: 'Term & Condition', navigate: 'AboutUs', icon: TermCondition, pagename: "terms" },
    { title: 'Privacy Policy', navigate: 'AboutUs', icon: Privacy, pagename: "privacy" },
    // { title: 'Settings', navigate: 'Settings', icon: SettingsIcon },
    { title: 'Contact US', navigate: 'AboutUs', icon: ContactUsIcon, pagename: "contact" },

    // { title: 'Contact US', navigate: 'ContactUs', icon: ContactUsIcon,pagename:"contact" },
    // { title: 'Help and Support', navigate: 'HelpSupport', icon: Help },
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
    } else if (item?.pagename) {
      navigation.navigate(item.navigate, { pagename: item.pagename, title: item.title });
    } else {
      handleNavigation(item.navigate);
    }
  };
const renderFooterButton = () => {
    // ❌ No seller data → Become Seller
    if (!sellerData) {
      return (
        <View style={styles.footerContainer}>
          <C_Button
            title="Become Seller"
            onPress={() => sellerRequest()}
            loading={kycData?.loading}
          />
        </View>
      );
    }

    // ⏳ KYC Pending
    if (kycStatus === 'PENDING') {
      return (
        <View style={styles.footerContainer}>
          <C_Button title="KYC Pending Approval" 
           onPress={() =>
              navigation.navigate('BecomeSeller')
            } />
        </View>
      );
    }

    // ❌ KYC Rejected
    if (kycStatus === 'REJECTED') {
      return (
        <View style={styles.footerContainer}>
          <C_Button
            title="Re-submit KYC"
            onPress={() => sellerRequest()}
          />
        </View>
      );
    }

    // ✅ KYC Approved
    if (kycStatus === 'APPROVED') {
      return (
        <View style={styles.footerContainer}>
          <C_Button
            title="Go to Seller Dashboard"
            onPress={() =>
              navigation.navigate('BecomeSeller')
            }
          />
        </View>
      );
    }

    return null;
  };

  return (
    <View style={CommonStyles.container}>
      <BackButton text="Profile" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => (
          <>
            <View style={styles.infoContainer}>
              <DriverIcon height={45} width={45} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{loginUserData?.name ??"New User"}</Text>
                <Text style={styles.userPhone}>{loginUserData?.phone}</Text>
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
            <item.icon width={24} height={24}/>
            <Text style={styles.menuText}>{item.title}</Text>
            <BackVerctor style={styles.rotatedIcon} size={16} color={Colors.black} />
          </TouchableOpacity>
        )}
        ListFooterComponent={renderFooterButton}
  
      />

    </View>
  );
};


const mapStateToProps = (state) => ({
  userRes: state?.userReducers?.data,
  kycData: state?.registerSellerReducers,
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
    footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});

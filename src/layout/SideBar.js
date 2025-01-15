import React, { useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, StyleSheet, Image } from 'react-native';
import { AboutIcon, AddressIcon, ComplainIcon, EditProfileIcon, Help, HistoryIcon, LogoutIcon, ReferralIcon, SettingsIcon } from '../assets/icons';
import { reset } from '../services/navigationService';
import { useActions } from '../hooks/useActions';



const SideBar = ({ navigation, onLogout }) => {
  const { logOut } = useActions();
  const [ expandedIndex, setExpandedIndex ] = useState(null);
  const [ selectedIndex, setSelectedIndex ] = useState(null);

  const Data = [
    { title: 'Profile', navigate: 'Profile', icon: EditProfileIcon, notificationsCount: 6 },
    { title: 'Address', navigate: 'Address', icon: AddressIcon, notificationsCount: 6 },
    { title: 'History', navigate: 'History', icon: HistoryIcon },
    { title: 'Complain', navigate: 'Complain', icon: ComplainIcon },
    { title: 'Referral', navigate: 'Referral', icon: ReferralIcon, notificationsCount: 6 },
    { title: 'About Us', navigate: 'AboutUs', icon: AboutIcon, notificationsCount: 6 },
    { title: 'Settings', navigate: 'Settings', icon: SettingsIcon, notificationsCount: 6 },
    { title: 'Help and Support', navigate: 'HelpSupport', icon: Help, notificationsCount: 6 },
    { title: 'Log Out', navigate: null, icon: LogoutIcon },
  ];

  const handleNavigation = (navigate, index) => {
    setSelectedIndex(index);
    if (navigate)
    {
      navigation.navigate(navigate);
    } else
    {
      logOut()
      reset([{ name: 'SignMobile' }]);
      // console.log("onLogout");
      // Call logout function if navigate is null
      // onLogout();
    }
  };

  const toggleSubMenu = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {Data.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => {
                if (item.subScreens)
                {
                  toggleSubMenu(index);
                } else
                {
                  handleNavigation(item.navigate, index);
                }
              }}
              style={[ styles.menuItem, index !== 0 && styles.borderTop ]}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                {item.icon && <item.icon width={24} height={24} />}
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>

            {expandedIndex === index && item.subScreens && (
              <View style={styles.subMenu}>
                {item.subScreens.map((subItem, subIndex) => (
                  <TouchableOpacity
                    key={subIndex}
                    onPress={() => handleNavigation(subItem.navigate, index)}
                    style={styles.subMenuItem}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.subMenuText}>{subItem.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    borderRadius:200
  },
  scrollView: {
    flex: 1,
  },
  menuItem: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 45,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopRightRadius: 15,   // Add border radius to the right side
    borderBottomRightRadius: 15, // Add border radius to the right side
    overflow: 'hidden',          // Ensure the radius is applied properly
  },
  menuText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 10, // To add space between icon and text
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#ccc', // Adjust the color as needed
  },
  subMenu: {
    paddingLeft: 20,
    backgroundColor: '#E2E2E2',
    marginHorizontal: 3,
  },
  subMenuItem: {
    paddingVertical: 5,
  },
  subMenuText: {
    color: 'black',
    fontSize: 16,
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { BackButton, C_Text } from '../components';
import BottomNavigator from './Bottomnavigator';
import Colors from '../themes/Colors';
import { FontSize, FontsWeights } from '../themes/Fonts';
import Images from '../utils/Images';
import { Camera } from '../assets/icons';
import SideBar from '../layout/SideBar';

const Drawer = createDrawerNavigator();
const screenOptions = {
  headerShown: false,
};

const DrawerNavigation = () => {
  const userRes = useSelector((state) => state?.userReducers?.data);
  const userData = userRes?.data;

  return (
    <Drawer.Navigator
      initialRouteName="BottomNavigator"
      drawerContent={(drawerProps) => (
        <View style={styles.drawerContent}>
          <BackButton
            drawer
            text="Back"
            handlePressDrawer={() => drawerProps.navigation.closeDrawer()}
          />
          <View style={styles.headerContainer}>
            <View style={styles.imageContainer}>
              {userData?.profilePicUrl ? (
                <Image source={{ uri: userData?.profilePicUrl }} style={styles.img} />
              ) : (
                <Image source={Images.blankuser} style={styles.img} />
              )}
            </View>
            <TouchableOpacity style={styles.cameraCon}>
              <Camera />
            </TouchableOpacity>
            <C_Text
              content={userData?.driverName}
              style={[styles.medium, styles.bold]}
              medium
            />
            <C_Text content={userData?.mobile} style={styles.medium} />
          </View>
          <SideBar navigation={drawerProps.navigation} />
        </View>
      )}
    >
      <Drawer.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{ ...screenOptions }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.gray,
    marginBottom: 10,
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  cameraCon: {
    height: 25,
    width: 25,
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 70,
    left: 96,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medium: {
    textAlign: 'left',
  },
  bold: {
    fontSize: FontSize.FS20,
    color: Colors.black,
    fontWeight: FontsWeights.FW600,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Categories,  Home,  Offer, Profile, Search} from '../screens/private';
import { CategoriesIcon, Homeicon, OfferIcon, ProfileTabIcon, SearchIcon} from '../assets/icons';
import Colors from '../themes/Colors';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false, // Hides the header
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        // backgroundColor: Colors.primary,
        height: 65,
        paddingBottom: 8,
        paddingTop: 8,
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
      },
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.black,
      tabBarShowLabel: true,
    }}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({color, size}) => (
          <Homeicon fill={color} width={size} height={size} />
        ),
        tabBarLabel: 'Home',
      }}
    />
    <Tab.Screen
      name="Categories"
      component={Categories}
      options={{
        tabBarIcon: ({color, size}) => (
          <CategoriesIcon fill={color} width={size} height={size} />
        ),
        tabBarLabel: 'Categories',
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({color, size}) => (
          <SearchIcon fill={color} width={size} height={size} />
        ),
        tabBarLabel: 'Search',
      }}
    />
    {/* <Tab.Screen
      name="Booking"
      component={Booking}
      options={{
        tabBarIcon: ({color, size}) => (
          <BookingIcon fill={color} width={size} height={size} />
        ),
        tabBarLabel: 'Booking',
      }}
    /> */}
    <Tab.Screen
      name="Offer"
      component={Offer}
      options={{
        tabBarIcon: ({color, size}) => (
          <OfferIcon fill={color} width={size} height={size} />
        ),
        tabBarLabel: 'Offer',
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({color, size}) => (
          <ProfileTabIcon fill={color} width={size} height={size} />
        ),
        tabBarLabel: 'Profile',
      }}
    />
  </Tab.Navigator>
);

export default BottomNavigator;

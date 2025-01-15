import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Humburg } from '../assets/icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Colors from '../themes/Colors';
import { FontsWeights } from '../themes/Fonts';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}>
        <Humburg height={30} width={30} />
      </TouchableOpacity>
      <Text style={styles.title}>Home</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 10, 
    height: 50,
    marginTop:15
  },
  title: {
    fontSize: 18,
    fontWeight:FontsWeights.FW500,
    textAlign: 'center',
    flex: 1,
    right:10,
    color:Colors.black
  },
});

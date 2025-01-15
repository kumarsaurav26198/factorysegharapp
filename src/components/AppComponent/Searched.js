import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { AddressIcon, BackVerctor } from '../../assets/icons';
import Colors from '../../themes/Colors';
import { FontSize } from '../../themes/Fonts';
import { useNavigation } from '@react-navigation/native';

const Searched = ({ location }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={()=>{navigation.navigate("BookRide")}}>
    <View style={styles.leftContainer}>
      <AddressIcon width={22} height={22} color={Colors.black} />
      <Text numberOfLines={1} style={styles.text}>
        {location}
      </Text>
    </View>
    <BackVerctor style={styles.rotatedIcon} width={20} height={20} color={Colors.black} />
  </TouchableOpacity>
  );
};

export default Searched;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: Colors.inputColor,
    marginHorizontal:20
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: Colors.black,
    fontSize: FontSize.FS17,
    marginLeft: 15,
    flex: 1,
    marginRight:40
  },
  rotatedIcon: {
    transform: [{ rotate: '180deg' }],
  },
});

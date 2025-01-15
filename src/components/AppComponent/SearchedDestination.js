import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { AddressIcon } from '../../assets/icons';
import Colors from '../../themes/Colors';
import { FontSize } from '../../themes/Fonts';
import { useNavigation } from '@react-navigation/native';

const SearchedDestination = ({ location }) => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity 
      style={styles.itemContainer} 
      onPress={() => { navigation.navigate("BookRide") }}
    >
      <View style={styles.leftContainer}>
        <AddressIcon width={22} height={22} color={Colors.black} />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>{location.title}</Text>
          <Text numberOfLines={1} style={styles.subtitle}>{location.subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchedDestination;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: Colors.inputColor,
    marginHorizontal: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    color: Colors.black,
    fontSize: FontSize.FS17,
    marginRight: 10,
    lineHeight: 20,
  },
  subtitle: {
    color: Colors.gray,   
    fontSize: FontSize.FS14,
    marginRight: 10,
    lineHeight: 18,
  },
});

import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Colors from '../../themes/Colors';
import { FontSize, FontsWeights } from '../../themes/Fonts';
import { InterCityCab } from '../../assets/icons';

const Categories = ({ item, isSelected, onPress }) => {
  return (
    <View style={styles.itemContainerWrapper}>
      <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        <View style={styles.imageContainer}>
            <InterCityCab/>
          {/* <Image
            source={{ uri: 'https://via.placeholder.com/70' }} 
            style={styles.image}
          /> */}
        </View>
        <Text numberOfLines={1} style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
      {isSelected && <Text style={styles.selectedText}>Selected</Text>}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  itemContainerWrapper: {
    flex: 1,
    margin: 5,
  },
  itemContainer: {
    alignItems: 'center',
    padding: 9,
    width: '100%',
  },
  imageContainer: {
    // width: 60,
    // height: 60,
    // borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Colors.black,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  itemText: {
    color: Colors.black,
    textAlign: 'center',
    marginTop: 5,
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW500,
  },
  selectedText: {
    textAlign: 'center',
    color: Colors.black,
    backgroundColor: Colors.black,
    width: '50%',
    alignSelf: 'center',
    height: 2,
    bottom: 5,
  },
});

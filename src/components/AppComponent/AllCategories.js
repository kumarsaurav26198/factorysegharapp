import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../../themes/Colors';
import { FontSize, FontsWeights } from '../../themes/Fonts';

const AllCategories = ({ onPress, categories, selectedCategory }) => {
  // eslint-disable-next-line react/no-unstable-nested-components
  const CategoryItem = ({ item }) => {
    const isSelected = item.category === selectedCategory;

    return (
      <TouchableOpacity
        style={[styles.itemContainer, isSelected && styles.selectedItem]}
        onPress={() => onPress(item.category)}>
        <Text style={[styles.itemText, isSelected && styles.selectedText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryItem item={item} />}
        keyExtractor={(item) => item.category}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default AllCategories;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
  },
  itemContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    minWidth: 80,
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: Colors.green,
  },
  selectedItem: {
    backgroundColor: Colors.inputFieldBg,
    borderWidth: 2,
    borderColor: Colors.red,
  },
  itemText: {
    color: Colors.black,
    fontSize: FontSize.FS16,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedText: {
    color: Colors.red,
    fontWeight: FontsWeights.FW900,
  },
});

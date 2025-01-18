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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#8B0000',
    backgroundColor: 'white',
    marginHorizontal:5
  },
  selectedText: {
    color: Colors.white,
    fontWeight: FontsWeights.FW900,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#8B0000',
    backgroundColor: 'white',
  },
  selectedItem: {
    backgroundColor: '#8B0000',
  },
  itemText: {
    color: '#8B0000',
    fontSize: 14,
  },
  selectedItemText: {
    color: 'white',
  }
});

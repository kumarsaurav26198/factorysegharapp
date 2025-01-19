import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';

const FragranceList = ({ fragrances, selectedname, onPress }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => onPress(item.name)}  // Passing the name instead of id
        style={[
          styles.item,
          selectedname === item.name && styles.selectedItem,  // Check if selectedname matches the item's name
        ]}
      >
        <Text
          style={[
            styles.itemText,
            selectedname === item.name && styles.selectedItemText,  // Change text style based on selectedname
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={fragrances}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.id?.toString() || item?.name || index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default FragranceList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  listContainer: {
    gap: 8,
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
    backgroundColor: '#8B0000',  // Highlight background color
  },
  itemText: {
    color: '#8B0000',
    fontSize: 14,
  },
  selectedItemText: {
    color: 'white',  // Change text color when selected
  }
});

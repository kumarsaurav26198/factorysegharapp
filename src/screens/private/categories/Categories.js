import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { ProductIcon } from '../../../assets/icons';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { category: 'ALL', name: 'All' },
    { category: 'pooja_range', name: 'Pooja Range' },
    { category: 'tissue_range', name: 'Tissue Range' },
    { category: 'cleaning_range', name: 'Cleaning Range' },
    { category: 'aluminum_foil', name: 'Aluminum Foil' },
    { category: 'food_wrapping_paper', name: 'Food Wrapping Paper' },
    { category: 'institution_range', name: 'Institution Range' },
  ];

  const renderItem = ({ item }) => {
    const isSelected = item.category === selectedCategory;
    return (
      <TouchableOpacity
        style={[styles.categoryItem, isSelected && styles.selectedCategory]}
        onPress={() => {
          setSelectedCategory(item.category)
          
        }}
      >
        <Text style={[styles.categoryText, isSelected && styles.selectedText]}>{item.name}</Text>
        <ProductIcon />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.category}
        contentContainerStyle={styles.listContainer}
        numColumns={2} 
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', // Darker color for title
  },
  listContainer: {
    marginTop: 8,
  },
  categoryItem: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
    margin: 8,
    borderRadius: 12, // Rounded corners for category items
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, // Shadow for Android
    transition: 'transform 0.2s ease', // Smooth scaling on press
  },
  selectedCategory: {
    backgroundColor: '#dcdcdc', // Lighter background for selected category
    shadowColor: '#007bff', // More prominent shadow on selection
    shadowOpacity: 0.2,
    elevation: 6, // Slightly bigger shadow on selected category
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555', // Slightly lighter text color for categories
  },
  selectedText: {
    color: '#007bff', // Change text color for selected category
    fontWeight: 'bold',
  },
});

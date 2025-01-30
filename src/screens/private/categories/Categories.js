import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { navigate } from '../../../services/navigationService';
import Images from '../../../utils/Images';
import Colors from '../../../themes/Colors';

const Categories = () => {
const [selectedCategory, setSelectedCategory] = useState("ALL");

const categories = [
  { category: 'ALL', name: 'All', imagepath: Images.p7 },
  { category: 'pooja_range', name: 'Pooja Range', imagepath: Images.p1 },
  { category: 'tissue_range', name: 'Tissue Range', imagepath: Images.p6 },
  { category: 'cleaning_range', name: 'Cleaning Range', imagepath: Images.p2 },
  { category: 'aluminum_foil', name: 'Aluminum Foil', imagepath: Images.p3 },
  { category: 'food_wrapping_paper', name: 'Food Wrapping Paper', imagepath: Images.p4 },
  { category: 'institution_range', name: 'Institution Range', imagepath: Images.p5 },
];

const renderItem = ({ item }) => {
  const isSelected = item.category === selectedCategory;
  return (
    <TouchableOpacity
      style={[styles.categoryItem, isSelected && styles.selectedCategory]}
      onPress={() => {
        setSelectedCategory(item.category);
        console.log(item.category)
        navigate('AllProduct', { category: item.category });
      }}
    >
      <Image
        source={item.imagepath}
        style={styles.imageContainer}
        resizeMode="contain"
      />
      {/* <Text style={[styles.categoryText, isSelected && styles.selectedText]}>
        {item.name}
      </Text> */}
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
      ListFooterComponent={<View style={{ height: 50 }} />}
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
  color: '#333',
},
listContainer: {
  // flexGrow: 1,
  justifyContent: 'space-between',
  // marginTop: 8,
},
categoryItem: {
  // flex: 1,
  backgroundColor: Colors.white,
  padding: 10,
  margin: 8,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 4,
  // width:160,
  // height: 160,
  // borderRadius: 20,
  borderWidth:2,
  borderColor:Colors.white
},
selectedCategory: {
  backgroundColor: '#dcdcdc',
  shadowColor: '#007bff',
  shadowOpacity: 0.2,
  elevation: 6,
},
categoryText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#555',
  marginTop: 8, // Add spacing between the image and text
},
selectedText: {
  color: '#007bff',
  fontWeight: 'bold',
},
imageContainer: {
  width:150,
  height: 150,
  // borderRadius: 20,
  borderWidth:2,
  borderColor:Colors.white
},
});

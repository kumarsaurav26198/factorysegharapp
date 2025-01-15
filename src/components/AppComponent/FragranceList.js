import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const FragranceList = () => {
  const [selectedId, setSelectedId] = useState(0);

  const fragrances = [
    { id: 0, name: 'Rose' },
    { id: 1, name: 'Lavender' },
    { id: 2, name: 'Sandal' },
    { id: 3, name: 'Jasmine' },
    { id: 4, name: 'Rose' },
    { id: 5, name: 'Lavender' },
    { id: 6, name: 'Sandal' },
    { id: 7, name: 'Jasmine' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => setSelectedId(item.id)}
      style={[
        styles.item,
        selectedId === item.id && styles.selectedItem
      ]}
    >
      <Text style={[
        styles.itemText,
        selectedId === item.id && styles.selectedItemText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={fragrances}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

export default FragranceList

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 16,
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
    backgroundColor: '#8B0000',
  },
  itemText: {
    color: '#8B0000',
    fontSize: 14,
  },
  selectedItemText: {
    color: 'white',
  }
})
import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {SearchBox, Searched} from '../components';
import Colors from '../themes/Colors';
import { useNavigation } from '@react-navigation/native';

const SearchContainer = () => {
  const navigation = useNavigation();

  const locations = [
    'Indira Gandhi International Airport, New Delhi',
    'Indira Gandhi International Airport, New Delhi',
    'Indira Gandhi International Airport, New Delhi',
  ];

  return (
    <View style={styles.mainContainer}>
      <SearchBox placeholder="Search Destination" onPress={()=>{navigation.navigate("PickDestination")}}  editable={false} />
      <FlatList
        data={locations}
        renderItem={({item}) => <Searched location={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default SearchContainer;

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    borderColor: Colors.primary,
    marginHorizontal: 20,
    marginTop:10,
    borderRadius: 8,
  },
});

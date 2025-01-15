import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CommonStyles } from '../../../themes/CommonStyles';
import { BackButton } from '../../../components';
import SearchBar from '../../../components/AppComponent/SearchBox';

const PickUp = () => {
  // Create a state variable to hold the value of the search bar
  const [searchValue, setSearchValue] = useState("Shadipur Colony, west Pate...");

  return (
    <View style={CommonStyles.container}>
      <BackButton text="Pick-up" left myself />
      <SearchBar 
        greenDot 
        placeholder="Enter Starting Location"  
        value={searchValue} 
        editable={true} 
        onChangeText={setSearchValue} 
        clearValue={()=>setSearchValue("")}
      />
    </View>
  );
};

export default PickUp;

const styles = StyleSheet.create({});

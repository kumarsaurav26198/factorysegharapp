import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BackButton, C_Text, LocationSelector, SearchedDestination } from '../../../components';
import { CommonStyles } from '../../../themes/CommonStyles';

const PickDestination = () => {
  const locations = [
    {
      title: 'Indira Gandhi International; Airport Termina',
      subtitle: 'Terminal 2B Rd, Indira Gandhi International ...',
    },
    {
      title: 'Indira Gandhi International; Airport Termina',
      subtitle: 'Terminal 2B Rd, Indira Gandhi International ...',
    },
    {
      title: 'Indira Gandhi International; Airport Termina',
      subtitle: 'Terminal 2B Rd, Indira Gandhi International ...',
    },
    {
      title: 'Indira Gandhi International; Airport Termina',
      subtitle: 'Terminal 2B Rd, Indira Gandhi International ...',
    },
  ];
  return (
    <View style={CommonStyles.container}>
      <BackButton left text="Destination" myself/>
      <LocationSelector/>
      <C_Text content={"Booking Categories"} medium style={{ textAlign: 'left', left:20,marginBottom:10}} />
      <FlatList
        data={locations}
        renderItem={({item}) => <SearchedDestination location={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default PickDestination;

const styles = StyleSheet.create({
  
});
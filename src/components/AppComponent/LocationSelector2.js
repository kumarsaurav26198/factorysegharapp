import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../../themes/Colors';
import { ClockIcon, EditIcon } from '../../assets/icons';

const LocationOption = ({ isStart, isEnd, location, onChangeText,editable }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.locationContainer, isStart ? styles.locationContainerGreen : styles.locationContainerRed]}>
      <View
        style={[
          styles.dot,
          isStart ? styles.greenDot : isEnd ? styles.redDot : styles.dot,
          isFocused && styles.focusedDot,
        ]}
      />
      <TextInput
        style={styles.locationInput}
        placeholder={isStart ? "Enter Starting Location" : "Enter Destination"}
        placeholderTextColor={Colors.darkgrey}
        value={location}
        onChangeText={onChangeText}
        numberOfLines={1}
        onFocus={() => setIsFocused(true)}  
        onBlur={() => setIsFocused(false)}  
        editable={editable}
      />
      {editable &&<TouchableOpacity onPress={()=>setIsFocused(true)}>
        <EditIcon/>
        </TouchableOpacity>}
    </View>
  );
};

export default function LocationSelector2({ clock, startEditable,endEditable}) {
  const [startLocation, setStartLocation] = useState('Shadipur Colony, west Patel Nagar...');
  const [endLocation, setEndLocation] = useState('Delhi Railway station Terminal .....');

  return (
    <View style={styles.container}>
      <View style={styles.locationsContainer}>
        <LocationOption 
          location={startLocation}
          onChangeText={setStartLocation}
          isStart={true} 
          editable={startEditable}
        />
        <LocationOption 
          location={endLocation}
          onChangeText={setEndLocation}
          isEnd={true} 
          editable={endEditable}
        />
      </View>
      {clock && (
        <View style={styles.nowContainer}>
          <ClockIcon size={24} color="#000" />
          <Text style={styles.nowText}>Now</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6E6FA',
    borderRadius: 10,
    margin: 20,
    backgroundColor: Colors.inputFieldBg,
    borderWidth:1,
    borderColor:Colors.primary
  },
  locationsContainer: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationContainerGreen: {
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  locationContainerRed: {
    paddingTop: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  focusedDot: {
    width: 12, 
    height: 12,
    borderRadius:10
  },
  greenDot: {
    backgroundColor: '#4CAF50',
  },
  redDot: {
    backgroundColor: '#F44336',
  },
  locationInput: {
    fontSize: 16,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputColor,
    paddingVertical: 5,
    color: '#000000',
    fontWeight: '500',
  },
  nowContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 5,
    left: -10,
    borderRadius: 10,
  },
  nowText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
});

import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { C_Button, C_Text } from '../components';
import Recommended from '../components/AppComponent/Recommended';
import { InterCityCab } from '../assets/icons';
import Colors from '../themes/Colors';
import { FontSize } from '../themes/Fonts';

const AcceptBookingCon = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <InterCityCab />
        <C_Text content="One Way" medium />
        <TouchableOpacity>
          <Text style={styles.text}>Grab now</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={[ 1 ]}
        renderItem={({ }) => <Recommended />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AcceptBookingCon;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  headerText: {
    textAlign: 'left',
    marginBottom: 15,
    bottom: 5,
  },
  innercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    // paddingTop: 10,
  },
  text: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    fontSize: FontSize.FS17,
  },
});

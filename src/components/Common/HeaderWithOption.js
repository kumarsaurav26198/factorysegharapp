import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../themes/Colors';
import {  FontSize, FontsWeights } from '../../themes/Fonts';
import { Dropdown } from 'react-native-element-dropdown';
import { BackVerctor, RightArrow } from '../../assets/icons';
import { navigate } from '../../services/navigationService';

const HeaderWithOption = ({ title, title2,drop, data, selectedValue, onChangeValue, upArrow,rightArrow }) => {
  const [ isFocus, setIsFocus ] = useState(false);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.vehicleNumber}>{title}</Text>
      </View>
      <View style={styles.rightContainer}>
        {rightArrow && (
          <TouchableOpacity style={styles.dropdownRow} onPress={()=>{
            navigate("AllProduct")
          }}>
        <Text style={[styles.vehicleNumber,{color:Colors.primary}]}>{title2}</Text>
            <RightArrow style={{}} size={16} color={Colors.black} />
          </TouchableOpacity>
        )}
        {drop && (
          <View style={styles.dropdownRow}>
            <Dropdown
              style={[ styles.dropdown, isFocus && { borderColor: Colors.primary } ]}
              data={data}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'View All' : '...'}
              value={selectedValue}
              selectedTextStyle={styles.viewAll}
              itemTextStyle={styles.viewAll}
              placeholderStyle={styles.viewAll}
              iconStyle={styles.iconStyle}
              dropdownPosition="top"
              maxHeight={150}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setIsFocus(false);
                onChangeValue(item.value);
              }}
            />
          </View>
        )}
        {
          upArrow &&
          <TouchableOpacity>
            <BackVerctor style={styles.rotatedIcon} size={16} color={Colors.black} />
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

export default HeaderWithOption;

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "flex-start",
    backgroundColor: Colors.white,
    padding: 10,
    paddingHorizontal:15
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  vehicleNumber: {
    fontSize: FontSize.FS18,
    fontWeight: FontsWeights.FW600,
    color: Colors.black,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAll: {
    fontSize: FontSize.FS16,
    fontWeight: FontsWeights.FW600,
    color: Colors.primary,
    left: 10
  },
  dropdown: {
    height: 40,
    borderColor: Colors.gray,
    borderWidth: 0,
    paddingLeft: 10,
    width: 120,
  },
  iconStyle: {
    tintColor: Colors.primary,
    width: 30
  },
  rotatedIcon: {
    transform: [ { rotate: '90deg' } ],
  },
  rotatedIcon2: {
    transform: [ { rotate: '180deg' } ],
    marginHorizontal:10
  },
});

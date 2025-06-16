import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from 'react-native';
import React from 'react';
import Colors from '../../themes/Colors';
import { Close } from '../../assets/icons';
import C_Text from '../Common/C_Text';
import { capitalizeFirstLetter } from '../../utils/validators';
import { CommonStyles } from '../../themes/CommonStyles';
import C_Button from '../Common/C_Button';
import { navigate } from '../../services/navigationService';

const Address_DropDown = ({
  handlePressClose,
  addressRes,
  selectedIndex,
  setSelectedIndex,
  handlePressDone,
}) => {
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedIndex(index);
        if (handlePressDone) {
          handlePressDone(addressRes[index]);
        } else {
          console.warn('handlePressDone is not defined');
        }
      }}
      style={[
        styles.addressItem,
        {
          borderColor:
            selectedIndex === index ? Colors.red : Colors.black,
        },
      ]}
    >
      <View style={styles.addressDetails}>
        <Text style={styles.addressType}>
          {capitalizeFirstLetter(item?.name)},{item?.addressLine1}
        </Text>
        <Text style={styles.addressText} numberOfLines={2}>
          {item?.addressLine2}, {item?.city}, {item?.state}, {item?.country},{' '}
          {item?.zipCode},{item?.phone}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={{ alignItems: 'center', marginTop: 50 }}>
      <Text>---- No Address Found ----</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePressClose} style={styles.closeButton}>
        <Close />
      </TouchableOpacity>
      <C_Text
        content="Select Delivery Address"
        medium={true}
        style={{ margin: 10 }}
      />
      <FlatList
        data={addressRes}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => `address-${index}`}
        ListFooterComponent={<View style={{ height: 120 }} />}
        ListEmptyComponent={renderEmptyList}
      />
      <View style={CommonStyles.bottomView}>
       <C_Button title="Add Address"  onPress={()=>{
        handlePressDone()
        // navigate("Address")

       }}/>


      </View>
    </View>
  );
};

export default Address_DropDown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    height: 380,
    width: '100%',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightGray,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.bgGreen,
  },
  addressDetails: {
    flex: 1,
  },
  addressType: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  addressText: {
    fontSize: 14,
    color: Colors.gray,
  },
});

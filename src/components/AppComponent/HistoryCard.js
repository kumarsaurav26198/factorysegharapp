import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontSize, FontsWeights} from '../../themes/Fonts';
import Colors from '../../themes/Colors';
import {useNavigation} from '@react-navigation/native';
import {SmallProductIcon} from '../../assets/icons';
// import SmallProductIcon from '../../assets/icons/SmallProductIcon';

const HistoryCard = ({item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('HistoryDetails')}>
      <View style={styles.header}>
        <View>
          <Text style={styles.orderIdText}>Order ID: {item.orderId}</Text>
          <Text style={styles.emailText}>{item.userEmail}</Text>
        </View>
        <Text style={styles.dateText}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.itemsContainer}>
        {item.items.map(item => (
          <View key={item._id} style={styles.itemRow}>
            <View>
              <SmallProductIcon />
              <Text style={styles.itemIdText}>{item.productName}</Text>
              {item?.productDetail?.variants && (
                <Text style={styles.itemIdText}>
                  Variants: {item.productDetail.variants}
                </Text>
              )}
              {item?.productDetail?.sku && (
                <Text style={styles.itemIdText}>
                  SKU:{item.productDetail.sku}
                </Text>
              )}
              {item?.productDetail?.caseSize && (
                <Text style={styles.itemIdText}>
                  CaseSize :{item.productDetail.caseSize}
                </Text>
              )}

            </View>
            <Text style={styles.itemQuantityText}>Qty: {item.quantity}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.amountText}>₹{item.totalAmount}</Text>
        <Text
          style={[
            styles.statusText,
            {
              color:
                item.status === 'Pending'
                  ? Colors.orange
                  : item.status === 'Completed'
                  ? Colors.green
                  : Colors.red,
            },
          ]}>
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    margin: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.lightGrey,
  },
  orderIdText: {
    fontSize: FontSize.FS16,
    fontWeight: FontsWeights.FW600,
    color: Colors.primary,
  },
  emailText: {
    fontSize: FontSize.FS14,
    color: Colors.darkgrey,
  },
  dateText: {
    fontSize: FontSize.FS14,
    color: Colors.gray,
  },
  itemsContainer: {
    padding: 15,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemIdText: {
    fontSize: FontSize.FS16,
    color: Colors.black,
    fontWeight: '700',
    marginBottom: 4,
  },
  itemQuantityText: {
    fontSize: FontSize.FS16,
    color: Colors.black,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.primary,
    backgroundColor: Colors.lightP,
  },
  amountText: {
    fontSize: FontSize.FS16,
    fontWeight: FontsWeights.FW600,
    color: Colors.primary,
  },
  statusText: {
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW500,
  },
});

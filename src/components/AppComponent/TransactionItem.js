import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ArrowUpIcon, CheckIcon } from '../../assets/icons';
import Colors from '../../themes/Colors';

const TransactionItem = ({item}) => {
  return (
    <View style={styles.itemContainer}>
    <View style={[styles.iconContainer, item.type === 'outgoing' ? styles.outgoingIcon : styles.incomingIcon]}>
      {item.type === 'outgoing' ? (
        <ArrowUpIcon size={16} color="white" />
      ) : (
        <CheckIcon size={16} color="white" />
      )}
    </View>
    <View style={styles.detailsContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
    <Text style={styles.amount}>₹{item.amount}</Text>
  </View>
  )
}

export default TransactionItem

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.primary,
        marginHorizontal:20,
        marginBottom:10

      },
      iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
      },
      outgoingIcon: {
        backgroundColor: '#FFCDD2',
      },
      incomingIcon: {
        backgroundColor: '#c0edd5',
      },
      detailsContainer: {
        flex: 1,
      },
      name: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1F2937',
      },
      timestamp: {
        fontSize: 14,
        color: '#6B7280',
      },
      amount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
      },
})
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import Colors from '../../../themes/Colors';
import {BackButton} from '../../../components';

const Offer = ({usersRes}) => {
  const referrals = usersRes[0]?.cashbackInfomation || [];

  const renderReferralItem = ({item}) => (
    <View style={styles.referralItem}>
      <View>
        <Text style={styles.userName}>{item.title}</Text>
        <Text style={styles.userEmail}>{item.referredUserEmail}</Text>
      </View>
      <View>
        <Text style={styles.cashbackText}>₹{item.amount}</Text>
      </View>
    </View>
  );
  return (
    <View>
      <BackButton left text="Refer & Earn" cashback={usersRes[0]?.cashback} />
      <FlatList
        data={referrals}
        keyExtractor={item => item._id}
        renderItem={renderReferralItem}
        ListEmptyComponent={
          <Text style={styles.noReferralsText}>No referrals yet!</Text>
        }
        contentContainerStyle={styles.referralList}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  usersRes: state?.userReducers?.data,
});
export default connect(mapStateToProps)(Offer);

const styles = StyleSheet.create({
  referralList: {
    flexGrow: 1,
    padding: 15,
  },
  referralItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 5,
  },
  cashbackText: {
    fontSize: 14,
    color: Colors.green,
    fontWeight: 'bold',
  },
  noReferralsText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.gray,
    marginTop: 20,
  },
});

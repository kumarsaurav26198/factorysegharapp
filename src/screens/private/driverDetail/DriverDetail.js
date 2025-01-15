import React, { useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CommonStyles} from '../../../themes/CommonStyles';
import {BackButton} from '../../../components';
import {DriverIcon, DurationIcon, WhiteBike} from '../../../assets/icons';
// import StarRating from 'react-native-star-rating-widget';
import {FontSize, FontsWeights} from '../../../themes/Fonts';
import Colors from '../../../themes/Colors';
import { AddReview, ModalWrapper } from '../../../components/Modal';

const DriverDetail = () => {
  const ratingValue = 3.8;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };


  return (
    <View style={CommonStyles.container}>
      <BackButton left text="Driver Detail" Driver />
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <DriverIcon width={120} height={120} />
        </View>
        <Text style={styles.name}>John Smith</Text>
        <Text style={styles.phone}>8234596793</Text>

        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statItem} onPress={toggleModal}>
            <TouchableOpacity style={styles.iconContainer} >
              {/* <StarRating
                disabled={true}
                onChange={() => {}}
                maxStars={1}
                rating={ratingValue}
                color={Colors.white}
                starSize={22}
              /> */}
            </TouchableOpacity>
            <Text style={styles.infoValue}>4.8</Text>
            <Text style={styles.infoLabel}>Ratings</Text>
          </TouchableOpacity>
          <View style={styles.statItem}>
            <View style={styles.iconContainer}>
              <WhiteBike />
            </View>
            <Text style={styles.infoValue}>279</Text>
            <Text style={styles.infoLabel}>Trips</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.iconContainer}>
              <DurationIcon/>
            </View>
            <Text style={styles.infoValue}>5</Text>
            <Text style={styles.infoLabel}>Years</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Member Since</Text>
            <Text style={styles.infoValue}>Sep 09, 2024</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Bike Model</Text>
            <Text style={styles.infoValue}>Optima Plus Li</Text>
          </View>
        </View>
      </View>

      <ModalWrapper
        visible={isModalVisible}
        onRequestClose={toggleModal}
        center={true}>
        <AddReview handlePressAddReview={toggleModal}/>
      </ModalWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: FontSize.FS22,
    fontWeight: FontsWeights.FW600,
    color: Colors.black,
    marginBottom: 5,
  },
  phone: {
    fontSize: FontSize.FS18,
    fontWeight: FontsWeights.FW500,
    color: Colors.black,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
    marginTop:20
  },
  statItem: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },

  infoContainer: {
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: FontSize.FS14,
    color:Colors.black,
  },
  infoValue: {
    fontSize: FontSize.FS16,
    color:Colors.black,
    fontWeight:FontsWeights.FW600
  },
});

export default DriverDetail;

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {DriverIcon,} from '../../assets/icons';
import {FontSize, FontsWeights} from '../../themes/Fonts';
import Colors from '../../themes/Colors';
import {useNavigation} from '@react-navigation/native';
// import StarRating from 'react-native-star-rating-widget';
import C_Text from '../Common/C_Text';

export default function HistoryDriverInfo() {
  const navigation = useNavigation();
  const ratingValue = 3.8;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <DriverIcon height={45} width={45} />
        <View style={styles.infoTextContainer}>
          <Text style={styles.driverName}>Mohan Gupta</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.vehicleModel}>Optima Plus U</Text>
            <StarRating
              disabled={true}
              onChange={() => {}}
              maxStars={1}
              rating={ratingValue}
              color={Colors.primary}
              starSize={17}
              starStyle={styles.starStyle}
            />
            <Text style={styles.ratingValue}>{ratingValue}</Text>
          </View>
          <Text style={styles.youRatedText}>You rated</Text>
          {/* <StarRating
            disabled={true}
            onChange={() => {}}
            maxStars={5}
            rating={ratingValue}
            color={Colors.primary}
            starSize={17}
            starStyle={styles.starStyle}
          /> */}
        </View>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            // navigation.navigate("DriverDetail");
          }}>
          <C_Text content="Cancelled" style={{color: Colors.black}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 20,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  driverName: {
    fontSize: FontSize.FS18,
    fontWeight: FontsWeights.FW600,
    color: Colors.black,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  vehicleModel: {
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW500,
    color: '#666',
    marginRight: 5,
  },
  starStyle: {
    marginRight: 5,
  },
  ratingValue: {
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW500,
    color: Colors.primary,
  },
  youRatedText: {
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW500,
    color: Colors.black,
    marginBottom: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightP,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  vehicleIcon: {
    marginLeft: 15,
  },
});

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../../themes/Colors';
import { screenDimensions } from '../../../themes/CommonStyles';
import { Splash } from '../../../assets/icons';

const Splashscreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Splash />
      </View>
  
    </View>
  );
};

export default Splashscreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: screenDimensions.screenWidth,
    height: screenDimensions.screenHeight,
    backgroundColor: Colors.white,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    width: screenDimensions.screenWidth,
    position: 'absolute',
    bottom: -20,
  },
});

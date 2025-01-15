import {
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import { WelocmeImage } from '../../../assets/icons';
import { C_Button, C_Text } from '../../../components';
import Colors from '../../../themes/Colors';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../../../assets/images/background.png')}>
      <View style={styles.container}>
        <WelocmeImage />
        <View style={styles.textContainer}>
          <C_Text content={`"Journey Starts Here:`} medium   style={styles.medium}  />
          <C_Text content={`Explore, Discover, Wander"`} bold style={[styles.medium,styles.bold]} />
          <C_Text 
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
            style={styles.loremText} 
          />
        </View>
        <C_Button 
          title="Continue" 
          onPress={() => navigation.navigate("SignMobile")}
        />
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
  },
  medium: {
    color: Colors.primary,
  },
  bold: {
    fontStyle:"italic"
  },
  loremText: {
    color: Colors.black,
    margin:10,
    paddingHorizontal:15
  },
});

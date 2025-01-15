import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { DriverIcon } from '../../assets/icons';

export default function DriverWaiting() {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,  // Move up by 10 units
          duration: 500, // Half a second
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,  // Return to original position
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Powered by 10 thousand + drivers</Text>
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>
      {/* Apply animation to the DriverIcon */}
      <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
        <DriverIcon />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 20,
  },
  progressFill: {
    width: '70%',
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
});

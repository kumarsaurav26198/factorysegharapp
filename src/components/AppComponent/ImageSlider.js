import React from 'react';
import { StyleSheet, Image, View, Text, Dimensions } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Colors from '../../themes/Colors';

const ImageSlider = ({ image }) => {
  const { width } = Dimensions.get('window');
  const cardWidth = width ;

  return (
    <View style={[styles.container, { width: cardWidth }]}>
      {image ? (
        <SwiperFlatList
          paginationActiveColor={Colors.primary}
          autoplay
          autoplayDelay={500}
          autoplayLoop
        >
          <View style={styles.child}>
            <Image 
              source={{ uri: image }} 
              style={[styles.card, { height: cardWidth  }]} // Adjust height dynamically
              // resizeMode="contain" 
            />
          </View>
        </SwiperFlatList>
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>No Image Available</Text>
        </View>
      )}
    </View>
  );
};

export default ImageSlider;

const { width } = Dimensions.get('window');
const cardWidth = width;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#fff',
    alignSelf: 'center',
    height:cardWidth,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal:20,
  },
  child: {
    width: cardWidth,
    borderRadius: 10,
    borderColor:Colors.bgGreen,
  },
  card: {
    width: cardWidth, // Full width of the container
  },
  placeholderContainer: {
    width: cardWidth,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: '#555',
  },
  paginationStyleItem: {
    width: 12,
    height: 12,
    // marginHorizontal: 3,
    // top: 12,
  },
});

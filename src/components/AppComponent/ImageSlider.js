import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { ProductDeatailsIcon } from '../../assets/icons';
import Colors from '../../themes/Colors';

const data = [1,1];

const ImageSlider = () => {
  return (
    <View style={styles.container}>
      {data && data.length > 0 ? (
        <SwiperFlatList
          showPagination
          paginationActiveColor={Colors.primary}
          paginationDefaultColor="#ccc"
          paginationStyleItem={styles.paginationStyleItem}
          autoplay ={true}
          autoplayDelay={500}
          autoplayLoop= {true}
        >
          {data.map((item, index) => (
            <View style={styles.child} key={index.toString()}>
              <ProductDeatailsIcon  style={styles.card}/>
            </View>
          ))}
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
    borderBottomLeftRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  child: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  placeholderContainer: {
    width: '100%',
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
    marginHorizontal: 3,
    top:12
  },
});

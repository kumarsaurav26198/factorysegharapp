import { FlatList, View, RefreshControl, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { CommonStyles } from '../../../themes/CommonStyles';
import { useActions } from '../../../hooks/useActions';
import { connect } from 'react-redux';
import ImageSlider from '../../../components/AppComponent/ImageSlider';
import Colors from '../../../themes/Colors';
import { BackButton, FragranceList } from '../../../components';

const ProductDetails = ({ }) => {
  const { fetchLoginUser } = useActions();
  const [ refreshing, setRefreshing ] = useState(false);

  const renderItem = useCallback(() => {
    return (
      <>
        <ImageSlider />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Black Dhoop</Text>
            <Text style={styles.variants}>4 Variants</Text>
          </View>
          <TouchableOpacity style={styles.priceBox}>
            <Text style={styles.variants}>380 gms</Text>
            <Text style={[ styles.title, { color: Colors.primary } ]}>$20.00</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Fragrance</Text>
        </View>
        <FragranceList />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Brand</Text>
            <Text style={styles.variants}>Good & Moore</Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Item Form</Text>
            <Text style={styles.variants}>Dhoop Cone</Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Product Benefits</Text>
            <Text style={styles.variants}>Aromatherapy, Relaxation</Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Item Length</Text>
            <Text style={styles.variants}>9 CM</Text>
          </View>
        </View>
      </>
    );
  }, []);

  useEffect(() => {
    fetchLoginUser();
  }, [ fetchLoginUser ]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLoginUser();
    setRefreshing(false);
  }, [ fetchLoginUser ]);

  return (
    <View style={[ CommonStyles.container, ]}>
      <BackButton left  cart />
      <FlatList
        data={[ 1 ]}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListFooterComponent={<View style={{ height: 20 }} />}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const mapStateToProps = state => ({
  verifyRes: state?.verifyReducers?.data,
});
export default connect(mapStateToProps)(ProductDetails);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  variants: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  priceBox: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    width: 110,
  },
});

import {
  FlatList,
  View,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {CommonStyles} from '../../../themes/CommonStyles';
import {useActions} from '../../../hooks/useActions';
import {connect} from 'react-redux';
import ImageSlider from '../../../components/AppComponent/ImageSlider';
import Colors from '../../../themes/Colors';
import {BackButton, FragranceList} from '../../../components';
import {useRoute} from '@react-navigation/native';

const ProductDetails = ({}) => {
  const route = useRoute();
  const {item} = route?.params;
  console.log("item=====>>",JSON.stringify(item,null,2))
  const {fetchLoginUser} = useActions();
  const [refreshing, setRefreshing] = useState(false);

  const transformedFragrances = item.productDetail[0]?.variants?.map(
    // eslint-disable-next-line no-shadow
    (item, index) => {
      return {
        id: index,
        name: item,
      };
    },
  );
  const [selectedname, setSelectedName] = useState(
    transformedFragrances[0]?.name || '',
  );
  const handleSelectFragrance = name => {
    setSelectedName(name);
  };
  const renderItem = () => {
    return (
      <>
        <ImageSlider image={item.image}/>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{item?.name}</Text>
            {item.productDetail[0]?.variants?.length > 0 && (
              <Text style={styles.categoryText}>
                {item.productDetail[0].variants.length === 1
                  ? ` ${item.productDetail[0].variants[0]}`
                  : `${item.productDetail[0].variants.length} Variants`}
              </Text>
            )}
            <FragranceList
              fragrances={transformedFragrances}
              selectedname={selectedname}
              onPress={handleSelectFragrance}
            />
          </View>
        </View>


        <View style={styles.container}>
        <Text style={styles.title}>Product Detail</Text>
        
          <TouchableOpacity style={styles.priceBox}>
            <Text style={styles.variants}>SKU</Text>
            <Text style={[styles.title, {color: Colors.primary}]}>{item?.productDetail[0].sku}</Text>
          </TouchableOpacity>

          
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
  };

  useEffect(() => {
    fetchLoginUser();
  }, [fetchLoginUser]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLoginUser();
    setRefreshing(false);
  }, [fetchLoginUser]);

  return (
    <View style={[CommonStyles.container]}>
      <BackButton
        left
        cart
        passParameter
        oneMoreFunction={() => console.log('Custom Function Called')}
      />
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListFooterComponent={<View style={{height: 20}} />}
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
    marginTop:10
  },
});

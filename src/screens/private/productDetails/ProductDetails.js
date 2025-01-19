import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  View,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { CommonStyles } from '../../../themes/CommonStyles';
import { useActions } from '../../../hooks/useActions';
import ImageSlider from '../../../components/AppComponent/ImageSlider';
import Colors from '../../../themes/Colors';
import { BackButton, C_Button, FragranceList } from '../../../components';
import { useRoute } from '@react-navigation/native';

const ProductDetails = () => {
  const route = useRoute();
  const { item } = route?.params;
  const { fetchLoginUser } = useActions();
  const [refreshing, setRefreshing] = useState(false);
  const [cart, setCart] = useState({});
  const scale = new Animated.Value(1);

  // Updated fragrance variants
  const transformedFragrances = item.productDetail[0]?.variants?.map((variant, index) => ({
    id: index,
    name: variant,
  }));

  // State to store selected fragrance, SKU and caseSize
  const [selectedName, setSelectedName] = useState(transformedFragrances[0]?.name || '');
  const [selectedCaseSize, setSelectedCaseSize] = useState();
  const [selectedSKU, setSelectedSKU] = useState();

  // Handling fragrance selection, which also updates SKU and caseSize
  const handleSelectFragrance = (name, caseSize, sku) => {
    setSelectedName(name);
    setSelectedCaseSize(caseSize);
    setSelectedSKU(sku);
  };

  const handleIncreaseQuantity = (sku) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };

      if (updatedCart[sku]) {
        updatedCart[sku].quantity += 1;
      } else {
        // If item doesn't exist, create a new entry with the selected SKU and details
        const productDetail = item.productDetail.find(detail => detail.sku === sku);
        updatedCart[sku] = {
          ...productDetail,
          quantity: 1,
        };
      }

      return updatedCart;
    });
  };

  const handleDecreaseQuantity = (sku) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };

      if (updatedCart[sku]?.quantity > 1) {
        updatedCart[sku].quantity -= 1;
      } else if (updatedCart[sku]?.quantity === 1) {
        delete updatedCart[sku]; // Remove the item if quantity reaches 0
      }

      return updatedCart;
    });
  };

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = () => {
    return (
      <>
        <ImageSlider image={item.image} />
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
              selectedname={selectedName}
              onPress={handleSelectFragrance}
            />
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Product Details</Text>
          {item?.productDetail?.map((detail, index) => (
            <View key={index} style={styles.detailBox}>
              <View style={styles.row}>
                <View style={styles.productDetailsRow}>
                  <View style={styles.productTextContainer}>
                    <Text style={styles.productName}>SKU: {detail?.sku}</Text>
                    <Text style={styles.productName}>Case Size: {detail?.caseSize}</Text>
                    <Text style={styles.productName}>Price: {detail?.price||100}</Text>
                    <Text style={styles.productDesc}>{item?.description}</Text>
                  </View>

                  <View style={styles.quantityContainer}>
                    <Animated.View
                      style={[
                        styles.quantityButton,
                        styles.minusButton,
                        { transform: [{ scale }] },
                      ]}
                    >
                      <TouchableOpacity
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        onPress={() => handleDecreaseQuantity(detail.sku)}
                      >
                        <Text style={styles.quantityButtonText}>−</Text>
                      </TouchableOpacity>
                    </Animated.View>

                    <View style={styles.quantityTextContainer}>
                      <Text style={styles.quantityText}>
                        {cart[detail.sku]?.quantity || 0}
                      </Text>
                    </View>

                    <Animated.View
                      style={[
                        styles.quantityButton,
                        styles.plusButton,
                        { transform: [{ scale }] },
                      ]}
                    >
                      <TouchableOpacity
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        onPress={() => handleIncreaseQuantity(detail.sku)}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </TouchableOpacity>
                    </Animated.View>
                  </View>
                </View>
              </View>
            </View>
          ))}
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
        ListFooterComponent={<View style={{ height: 150 }} />}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <View style={CommonStyles.bottomView}>
      <C_Button
  title="Add To cart"
  onPress={() => {
    const cartItems = Object.values(cart).map((detail) => {
      const productDetail = {};

      if (selectedName) {
        productDetail.varients = selectedName;
      }
      if (detail?.sku) {
        productDetail.sku = detail.sku;
      }
      if (detail?.caseSize) {
        productDetail.caseSize = detail.caseSize;
      }
      return {
        productName: item?.name,
        productDetail: productDetail,
        quantity: detail?.quantity || 1,
        price: detail?.price || 100,
      };
    });

    const payload = {
      customerName: "rahul sharma",
      mobile: "9891234513",
      cartItems: cartItems,
    };

    console.log("payload=====>>", JSON.stringify(payload, null, 2));
  }}
/>

      </View>
    </View>
  );
};

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
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  detailBox: {
    marginBottom: 16,
    borderRadius: 15,
    padding: 12,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    color: Colors.text_color,
    fontWeight: '700',
    marginBottom: 4,
  },
  productDesc: {
    fontSize: 14,
    color: Colors.text_color,
    fontWeight: '400',
  },

  quantityButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.buttonColor,
    borderRadius: 25,
    elevation: 3,
  },
  minusButton: {
    marginRight: 10,
  },
  plusButton: {
    marginLeft: 10,
  },
  quantityButtonText: {
    fontSize: 26,
    color: Colors.black,
    fontWeight: '600',
  },
  quantityTextContainer: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    color: Colors.primaryText,
    fontWeight: '500',
  },
  productDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Align items vertically in the center
  },
  productTextContainer: {
    flex: 1, // Take more space for the product details
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: Colors.white,
    elevation: 3,
    flex: 1, // Allow quantity controls to take less space
    justifyContent: 'center', // Align buttons to the end
  },
});

export default ProductDetails;

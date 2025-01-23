import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  View,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {CommonStyles} from '../../../themes/CommonStyles';
import {useActions} from '../../../hooks/useActions';
import ImageSlider from '../../../components/AppComponent/ImageSlider';
import Colors from '../../../themes/Colors';
import {BackButton, C_Button, FragranceList} from '../../../components';
import {useRoute} from '@react-navigation/native';
import {connect} from 'react-redux';

const ProductDetails = ({userRes, cartRes}) => {
  const route = useRoute();
  const {item} = route?.params;
  const {fetchLoginUser, addToCartRequest} = useActions();
  const [refreshing, setRefreshing] = useState(false);
  const cartData = cartRes?.data?.cartItems || [];

  const [cart, setCart] = useState({});
  const [updatedCart, setUpdatedCart] = useState({});
  const scale = new Animated.Value(1);

  const transformedFragrances = item.productDetail[0]?.variants?.map(
    (variant, index) => ({
      id: index,
      name: variant,
    }),
  );

  const [selectedName, setSelectedName] = useState(
    transformedFragrances[0]?.name || '',
  );

  const handleSelectFragrance = name => {
    setSelectedName(name);

    setUpdatedCart(prevCart => {
      const updated = {...prevCart};
      item.productDetail[0]?.variants.forEach(variant => {
        const variantSku = `${item.sku}_${variant}`;
        updated[variantSku] = {quantity: 0, previousQuantity: 0};
      });
      return updated;
    });
  };

  const handleAddToCart = (sku, caseSize, price) => {
    setUpdatedCart(prevCart => {
      const updated = {...prevCart};
      const variantSku = `${sku}_${selectedName}`;

      const existingItem = prevCart[variantSku];
      updated[variantSku] = {
        sku: sku,
        caseSize,
        price,
        previousQuantity: existingItem ? existingItem.quantity : 0,
        quantity: existingItem ? existingItem.quantity + 1 : 1,
      };

      const payload = {
        customerName: userRes[0]?.fullName,
        mobile: userRes[0]?.mobile,
        cartItems: {
          productName: item?.name,
          productDetail: {
            ...(selectedName && {variants: selectedName}),
            ...(updated[variantSku]?.sku && {sku: updated[variantSku]?.sku}),
            ...(updated[variantSku]?.caseSize && {
              caseSize: updated[variantSku]?.caseSize,
            }),
          },
          quantity: updated[variantSku]?.quantity,
          price: updated[variantSku]?.price,
        },
      };
      addToCartRequest(payload);
      return updated;
    });
  };

  const handleRemoveFromCart = sku => {
    setUpdatedCart(prevCart => {
      const updated = {...prevCart};
      const variantSku = `${sku}_${selectedName}`;

      const existingItem = prevCart[variantSku];

      if (!existingItem) return prevCart;

      updated[variantSku] = {
        ...existingItem,
        previousQuantity: existingItem.quantity,
        quantity: Math.max(existingItem.quantity - 1, 0),
      };

      const payload = {
        customerName: userRes[0]?.fullName,
        mobile: userRes[0]?.mobile,
        cartItems: {
          productName: item?.name,
          productDetail: {
            ...(selectedName && {variants: selectedName}),
            ...(updated[variantSku]?.sku && {sku: updated[variantSku]?.sku}),
            ...(updated[variantSku]?.caseSize && {
              caseSize: updated[variantSku]?.caseSize,
            }),
          },
          quantity: updated[variantSku]?.quantity || 0,
          price: updated[variantSku]?.price || 0,
        },
      };

      console.log(
        'handleRemoveFromCart payload===>>',
        JSON.stringify(payload, null, 2),
      );
      addToCartRequest(payload);
      return updated;
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
            {item.productDetail[0]?.variants?.length > 0 ? (
              <Text style={styles.categoryText}>
                {item.productDetail[0].variants.length} Variants
              </Text>
            ) : null}
            {transformedFragrances?.length > 0 ? (
              <FragranceList
                fragrances={transformedFragrances}
                selectedname={selectedName}
                onPress={handleSelectFragrance}
              />
            ) : null}
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Product Details</Text>
          {item?.productDetail?.map((cartItem, index) => (
            <View key={index} style={styles.detailBox}>
              <View style={styles.row}>
                <View style={styles.productDetailsRow}>
                  <View style={styles.productTextContainer}>
                    {cartItem?.sku && (
                      <Text style={styles.productName}>
                        SKU: {cartItem.sku}
                      </Text>
                    )}
                    {cartItem?.price && (
                      <Text style={styles.productName}>
                        Price: {cartItem.price || 100}
                      </Text>
                    )}
                    {item?.description && (
                      <Text style={styles.productDesc}>{item.description}</Text>
                    )}
                  </View>

                  <View style={styles.quantityContainer}>
                    <Animated.View
                      style={[
                        styles.quantityButton,
                        styles.minusButton,
                        {transform: [{scale}]},
                      ]}>
                      <TouchableOpacity
                        onPressIn={onPressIn}
                        disabled={
                          cart[`${cartItem.sku}_${selectedName}`]?.quantity <= 0
                        }
                        onPressOut={onPressOut}
                        onPress={() => {
                          handleRemoveFromCart(cartItem.sku);
                        }}>
                        <Text style={styles.quantityButtonText}>−</Text>
                      </TouchableOpacity>
                    </Animated.View>

                    <View style={styles.quantityTextContainer}>
                      <Text style={styles.quantityText}>
                        {updatedCart[`${cartItem.sku}_${selectedName}`]
                          ?.quantity || 0}
                      </Text>
                    </View>

                    <Animated.View
                      style={[
                        styles.quantityButton,
                        styles.plusButton,
                        {transform: [{scale}]},
                      ]}>
                      <TouchableOpacity
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        onPress={() => {
                          handleAddToCart(
                            cartItem.sku,
                            cartItem.caseSize,
                            cartItem.price,
                          );
                        }}>
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLoginUser();
    setRefreshing(false);
  }, [fetchLoginUser]);

  return (
    <View style={[CommonStyles.container]}>
      <BackButton left cart cartLenght={cartData?.length} />
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListFooterComponent={<View style={{height: 150}} />}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const mapStateToProps = state => ({
  userRes: state?.userReducers?.data,

  addressRes: state?.addressReducers?.data,
  cartRes: state?.cartReducers,
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
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  detailBox: {
    marginTop: 10,
    borderRadius: 15,
    padding: 12,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
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

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
  };

  const handleAddToCart = (sku, caseSize, price) => {
    setCart(prevCart => {
      const existingItem = prevCart[sku];
      const updatedCart = {
        ...prevCart,
        [sku]: {
          sku,
          caseSize,
          price,
          quantity: existingItem ? existingItem.quantity + 1 : 1,
        },
      };
      const payload = {
      customerName: userRes[0]?.fullName,
        mobile: userRes[0]?.mobile,
        cartItems:{
          productName: item?.name,
        productDetail: {
          variants: selectedName,
          sku: updatedCart[sku]?.sku,
          caseSize: updatedCart[sku]?.caseSize,
        },
        quantity: updatedCart[sku]?.quantity,
        price: updatedCart[sku]?.price,
        }

      };
      console.log("handleAddToCart payload===>>",JSON.stringify(payload,null,2));
      addToCartRequest(payload);
      return updatedCart;
    });
  };

  const handleRemoveFromCart = (sku) => {
    setCart((prevCart) => {
      const existingItem = prevCart[sku]; // Check if the item exists in the cart
  
      if (!existingItem) {
        return prevCart; // If the item doesn't exist, return the cart as is
      }
  
      // Always keep the item in the cart, even if quantity is 0
      const updatedCart = {
        ...prevCart,
        [sku]: {
          ...existingItem,
          quantity: Math.max(existingItem.quantity - 1, 0), // Decrement quantity but don't go below 0
        },
      };
  
      // Create the payload for the updated cart
      const payload = {
        customerName: userRes[0]?.fullName,
        mobile: userRes[0]?.mobile,
        cartItems: {
          productName: item?.name,
          productDetail: {
            variants: selectedName,
            sku: updatedCart[sku]?.sku, // Ensure `sku` is included
            caseSize: updatedCart[sku]?.caseSize, // Ensure `caseSize` is included
          },
          quantity: updatedCart[sku]?.quantity || 0, // Quantity can be 0 but keep the item
          price: updatedCart[sku]?.price || 0, // Price can be 0 if the item is not in the cart
        },
      };
  
      console.log("handleRemoveFromCart payload===>>", JSON.stringify(payload, null, 2));
      addToCartRequest(payload);
  
      return updatedCart; // Update the cart state
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
          {item?.productDetail?.map((cartItem, index) => (
            <View key={index} style={styles.detailBox}>
              <View style={styles.row}>
                <View style={styles.productDetailsRow}>
                  <View style={styles.productTextContainer}>
                    <Text style={styles.productName}>SKU: {cartItem?.sku}</Text>
                    <Text style={styles.productName}>
                      Case Size: {cartItem?.caseSize}
                    </Text>
                    <Text style={styles.productName}>
                      Price: {cartItem?.price || 100}
                    </Text>
                    <Text style={styles.productDesc}>{item?.description}</Text>
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
                        onPressOut={onPressOut}
                        onPress={() => {
                          handleRemoveFromCart(
                            cartItem.sku,
                            cartItem.caseSize,
                            cartItem.price,
                          );
                        }}>
                        <Text style={styles.quantityButtonText}>−</Text>
                      </TouchableOpacity>
                    </Animated.View>

                    <View style={styles.quantityTextContainer}>
                      <Text style={styles.quantityText}>
                        {cart[cartItem.sku]?.quantity || 0}
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

  // useEffect(() => {
  //   // fetchLoginUser();
  // }, [fetchLoginUser]);

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
      <View style={[CommonStyles.bottomView, {paddingHorizontal: 20}]}>
        <C_Button
          title="Add To cart"
          disabled={Object.keys(cart).length === 0}
          // loading
          // onPress={() => {
          //   const cartItems = Object.values(cart).map(detail => {
          //     const productDetail = {};

          //     if (selectedName) {
          //       productDetail.varients = selectedName;
          //     }
          //     if (detail?.sku) {
          //       productDetail.sku = detail.sku;
          //     }
          //     if (detail?.caseSize) {
          //       productDetail.caseSize = detail.caseSize;
          //     }
          //     return {
          //       productName: item?.name,
          //       productDetail: productDetail,
          //       quantity: detail?.quantity || 1,
          //       price: detail?.price || 100,
          //     };
          //   });

          //   const payload = {
          //     customerName: userRes[0]?.fullName,
          //     mobile: userRes[0]?.mobile,
          //     cartItems: cartItems,
          //   };
          //   addToCartRequest(payload);
          //   console.log('payload=====>>', JSON.stringify(payload, null, 2));
          // }}
        />
      </View>
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

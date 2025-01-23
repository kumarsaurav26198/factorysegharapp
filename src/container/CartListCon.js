import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import React, {  } from 'react';
import { SmallProductIcon } from '../assets/icons';
import Colors from '../themes/Colors';

const CartListCon = ({ item ,decrementQuantity,incrementQuantity,index}) => {
    // console.log("item===>",JSON.stringify(item,null,2))

    const scale = new Animated.Value(1);
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

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <SmallProductIcon />
                <View style={styles.quantityContainer}>
                    <Animated.View
                        style={[ styles.quantityButton, styles.minusButton, { transform: [ { scale } ] } ]}
                    >
                        <TouchableOpacity
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}
                            onPress={() => decrementQuantity(index)}
                        >
                            <Text style={styles.quantityButtonText}>−</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <View style={styles.quantityTextContainer}>
                        <Text style={styles.quantityText}>{item?.quantity}</Text>
                    </View>

                    <Animated.View
                        style={[ styles.quantityButton, styles.plusButton, { transform: [ { scale } ] } ]}
                    >
                        <TouchableOpacity
                            disabled={item.quantity>=item?.stock_quantity}
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}
                            onPress={() => incrementQuantity(index)}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
            <View style={styles.productTextContainer}>
                <Text style={styles.productName}>{item?.productName}</Text>
                <Text style={styles.productName}>Varients :{item?.productDetail?.variants}</Text>
                <Text style={styles.productName}>Price :{item?.price}</Text>
                <Text style={styles.productName}>SKU :{item?.productDetail?.sku}</Text>
                {/* <Text style={styles.productName}>Case Size :{item?.productDetail?.caseSize}</Text> */}
            </View>
        </View>
    );
};

export default CartListCon;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productTextContainer: {
        marginTop: 12, // Add spacing between rows
        flexDirection: 'column',
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
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: Colors.white,
        elevation: 3,
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
});

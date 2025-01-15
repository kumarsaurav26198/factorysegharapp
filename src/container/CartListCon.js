import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import React, { useState } from 'react';
import { SmallProductIcon } from '../assets/icons';
import Colors from '../themes/Colors';
import { useActions } from '../hooks/useActions';

const CartListCon = ({ item }) => {
    const { incrementQuantity, decrementQuantity } = useActions();

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
                            onPress={() => decrementQuantity({ itemId: item?.itemId })}
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
                            onPress={() => incrementQuantity({ itemId: item?.itemId })}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
            <View style={styles.productTextContainer}>
                <Text style={styles.productName}>{item?.name}</Text>
                <Text style={styles.productName}>Price :{item?.price}</Text>
                <Text style={styles.productName}>Stock :{item?.stock_quantity}</Text>
                <Text style={styles.productDesc}>{item?.description}</Text>
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

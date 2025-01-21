import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { ChevronRight } from 'lucide-react-native';
import Colors from '../../themes/Colors';
import { Close } from '../../assets/icons';

export default function OrderConfirmation({ handlePressOrderConfirmation, handlePressClose,itemTotal ,deliveryFee,totalPayable}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePressClose} style={styles.Closecon}>
                <Close />
            </TouchableOpacity>
            <View style={styles.section}>
                {/* <View style={styles.cardOption}>
                    <Image
                        source={{ uri: "https://raw.githubusercontent.com/kristiyanP/creditcard-generator/master/src/main/resources/mc.png" }}
                        style={styles.cardIcon}
                    />
                    <View style={styles.cardDetails}>
                        <Text style={styles.cardType}>Credit card</Text>
                        <Text style={styles.cardNumber}>2441 **** **** 4567</Text>
                    </View>
                    <View style={styles.radioOuter}>
                        <View style={styles.radioInner} />
                    </View>
                </View> */}

                {/* <View style={styles.cardOption}>
                    <Image
                        source={{ uri: "https://raw.githubusercontent.com/kristiyanP/creditcard-generator/master/src/main/resources/visa.png" }}
                        style={styles.cardIcon}
                    />
                    <View style={styles.cardDetails}>
                        <Text style={styles.cardType}>Credit card</Text>
                        <Text style={styles.cardNumber}>2441 **** **** 4567</Text>
                    </View>
                    <View style={[ styles.radioOuter, styles.radioOuterEmpty ]} />
                </View> */}
            </View>

            <View style={styles.section}>
                <View style={styles.deliveryAddress}>
                    <View style={styles.addressLeft}>
                        <View style={styles.avatarCircle}>
                            <Text style={styles.avatarText}>👤</Text>
                        </View>
                        <View style={styles.addressDetails}>
                            <Text style={styles.deliveryTitle}>Delivery Address</Text>
                            <Text style={styles.addressText} numberOfLines={1}>
                                Shreekar road rajendra nagar 98...
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Item Total</Text>
                    <Text style={styles.priceValue}>₹ {itemTotal}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Delivery fee</Text>
                    <Text style={styles.priceValue}>₹ {deliveryFee}</Text>
                </View>
                <View style={[ styles.priceRow, styles.totalRow ]}>
                    <Text style={styles.totalLabel}>Total Payable</Text>
                    <Text style={styles.totalValue}>₹ {totalPayable}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.continueButton} onPress={handlePressOrderConfirmation}>
                <Text style={styles.continueButtonText}>Continue to pay ₹ {totalPayable}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        width: "100%"
    },
    section: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 20,
    },
    cardOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'space-between',
    },
    cardIcon: {
        width: 40,
        height: 25,
        resizeMode: 'contain',
    },
    cardDetails: {
        flex: 1,
        marginLeft: 12,
    },
    cardType: {
        fontSize: 14,
        color: '#666',
    },
    cardNumber: {
        fontSize: 16,
        color: '#333',
        marginTop: 2,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#e32f45',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioOuterEmpty: {
        borderColor: '#ddd',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#e32f45',
    },
    deliveryAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    Closecon: {
        alignSelf: "flex-end"
    },
    addressLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 20,
    },
    addressDetails: {
        marginLeft: 12,
        flex: 1,
    },
    deliveryTitle: {
        fontSize: 14,
        color: '#666',
    },
    addressText: {
        fontSize: 16,
        color: '#333',
        marginTop: 2,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    priceLabel: {
        fontSize: 16,
        color: '#666',
    },
    priceValue: {
        fontSize: 16,
        color: '#333',
    },
    totalRow: {
        marginTop: 12,
        marginBottom: 0,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    continueButton: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});


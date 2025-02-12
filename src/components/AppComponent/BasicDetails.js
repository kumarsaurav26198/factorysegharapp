import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../themes/Colors';
import { FontSize, FontsWeights } from '../../themes/Fonts';

const BasicDetails = ({ item }) => {
    const items = item?.items;
    console.log("items====>>", JSON.stringify(items, null, 2));
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Basic Details</Text>
            {items.map(item => (
                <View key={item._id} style={styles.detailsContainer}>

                    <View >
                        <Text style={[ styles.label, { fontSize: FontSize.FS17, fontWeight: FontsWeights.FW600, marginBottom: 6 } ]}>{item.productName}</Text>
                        {item?.productDetail?.variants && (
                            <View style={styles.detailItem}>
                                <Text style={styles.label}>Variants: </Text>
                                <Text style={styles.value}>{item.productDetail.variants}</Text>
                            </View>)}
                        {item?.productDetail?.sku && (
                            <View style={styles.detailItem}>
                                <Text style={styles.label}>SKU: </Text>
                                <Text style={styles.value}>{item.productDetail.sku}</Text>
                            </View>)}
                        {
                            item?.productDetail?.caseSize && (
                                <View style={styles.detailItem}>
                                    <Text style={styles.label}>CaseSize: </Text>
                                    <Text style={styles.value}>{item.productDetail.caseSize}</Text>
                                </View>)}
                        {item?.quantity && (
                            <View style={styles.detailItem}>
                                <Text style={styles.label}>Quantity: </Text>
                                <Text style={styles.value}>{item.quantity}</Text>
                            </View>)}
                    </View>
                </View>


            ))}

        </View>
    );
};

export default BasicDetails;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 8,
        margin: 15,
    },
    header: {
        fontSize: FontSize.FS16,
        fontWeight: FontsWeights.FW600,
        color: Colors.primary,
        marginBottom: 10,
    },
    detailsContainer: {
        paddingVertical: 10,
        borderBottomWidth: 0.3
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: FontSize.FS14,
        fontWeight: FontsWeights.FW400,
        color: Colors.black,
    },
    value: {
        fontSize: FontSize.FS14,
        fontWeight: FontsWeights.FW400,
        color: Colors.black,
    },
});

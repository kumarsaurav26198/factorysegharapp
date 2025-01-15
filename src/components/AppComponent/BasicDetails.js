import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../themes/Colors';
import { FontSize, FontsWeights } from '../../themes/Fonts';

const BasicDetails = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Basic Details</Text>
            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Trip ID:</Text>
                    <Text style={styles.value}>#0CAC6C665</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Trip Type:</Text>
                    <Text style={styles.value}>Round Trip</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Trip Distance:</Text>
                    <Text style={styles.value}>30 km</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Trip Duration:</Text>
                    <Text style={styles.value}>1 hr</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.label}>Vehicle Type:</Text>
                    <Text style={styles.value}>Bike - Splendor</Text>
                </View>
            </View>
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

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontSize, FontsWeights } from '../../themes/Fonts';
import Colors from '../../themes/Colors';
import { useNavigation } from '@react-navigation/native';

export default function DriverInfo2() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.infoContainer}
            // onPress={() => navigation.navigate("DriverDetail")}
            >
                <View style={styles.section}>
                    <Text style={styles.vehicleModel}>Today’s Earning</Text>
                    <Text style={styles.vehicleNumber}>₹10,559.99</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.section}>
                    <Text style={styles.vehicleModel}>Total Trips</Text>
                    <Text style={styles.vehicleNumber}>504 km</Text>
                </View>

                <View style={styles.divider} />
                <View style={styles.section}>
                    <Text style={styles.vehicleModel}>Total Login Hrs</Text>
                    <Text style={styles.vehicleNumber}>280 Hrs</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        padding: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        borderColor: Colors.primary,
    },
    section: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        width: 1,
        height: '60%',
        backgroundColor: Colors.primary,
        marginHorizontal: 10, 
    },
    vehicleNumber: {
        fontSize: FontSize.FS20,
        fontWeight: FontsWeights.FW600,
        color: Colors.primary,
        marginBottom: 8,
    },
    vehicleModel: {
        fontWeight: FontsWeights.FW500,
        color: '#666',
        marginBottom: 8,
    },
    ratingValue: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primary,
        marginTop: 4,
    },
});

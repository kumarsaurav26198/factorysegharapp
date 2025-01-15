import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CalenderIcon } from '../../assets/icons';
import { FontSize, FontsWeights } from '../../themes/Fonts';
import Colors from '../../themes/Colors';
import { useNavigation } from '@react-navigation/native';

export default function DriverInfo3() {
    const navigation = useNavigation();
    const ratingValue = 4;

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.infoContainer}
            onPress={() => navigation.navigate("ShowAllBooking")}
            >
                <View>
                    <Text style={styles.vehicleNumber}>Bookings</Text>
                    <View style={styles.leftSection}>
                        <CalenderIcon height={25} width={25} style={{ marginRight: 15 }} />
                        <Text style={styles.vehicleNumber}>Current Bookings</Text>
                    </View>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.ratingValue}>{ratingValue}</Text>
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
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    rightSection: {
        justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    vehicleNumber: {
        fontSize: FontSize.FS18,
        fontWeight: FontsWeights.FW600,
        color: Colors.black,
    },
    ratingValue: {
        fontSize: FontSize.FS17,
        fontWeight: '600',
        color: Colors.primary,
        top: 13
    },
});

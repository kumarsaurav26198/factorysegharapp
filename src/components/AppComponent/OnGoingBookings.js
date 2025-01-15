import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../themes/Colors';

import { DriverIcon, OneWay } from '../../assets/icons';
import { FontSize, FontsWeights } from '../../themes/Fonts';
import HeaderWithOption from '../Common/HeaderWithOption';

const OnGoingBookings = () => {
    const [selectedValue, setSelectedValue] = useState(null);

    const data = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
    ];

    const handleValueChange = (value) => {
        setSelectedValue(value);
    };

    return (
        <View style={styles.container}>
            <HeaderWithOption
                title="On going bookings"
                drop={true}
                data={data}
                selectedValue={selectedValue}
                onChangeValue={handleValueChange}
            />
            <View style={styles.inercontainer}>
                <View style={styles.leftSection}>
                    <OneWay height={25} width={25} />
                </View>
                <View style={styles.middleSection}>
                    <Text style={styles.vehicleNumber}>One Way</Text>
                    <Text style={styles.vehicleModel}>Starts in: 1 Hr 5 min</Text>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.ratingValue}>{"17-09-2024"}</Text>
                </View>
            </View>
            <View style={styles.inercontainer}>
                <View style={styles.leftSection}>
                    <OneWay height={25} width={25} />
                </View>
                <View style={styles.middleSection}>
                    <Text style={styles.vehicleNumber}>One Way</Text>
                    <Text style={styles.vehicleModel}>Starts in: 1 Hr 5 min</Text>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.ratingValue}>{"17-09-2024"}</Text>
                </View>
            </View>
        </View>
    );
};

export default OnGoingBookings;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        margin: 13,
        borderRadius: 15,
        shadowColor: Colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    inercontainer: {
        backgroundColor: Colors.lightP,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start', 
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 12,
        bottom: 5,
        borderRadius: 8,
        borderColor: Colors.primary,
        marginBottom:15
    },
    leftSection: {
        backgroundColor:Colors.white,
        borderRadius:40,
        padding:10
    },
    middleSection: {
        flex: 1, 
        justifyContent: 'flex-start', 
        marginLeft: 10,
    },
    vehicleNumber: {
        fontSize: FontSize.FS18,
        fontWeight: FontsWeights.FW600,
        color: Colors.black,
        marginBottom: 8,
    },
    vehicleModel: {
        fontWeight: FontsWeights.FW500,
        color: Colors.black,
        marginBottom: 8,
    },
    rightSection: {
        justifyContent: 'flex-start', 
        alignItems: 'center',
    },
    ratingValue: {
        fontSize: FontSize.FS17,
        fontWeight: '600',
        color: Colors.primary,
    }
});

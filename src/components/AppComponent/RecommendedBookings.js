import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../themes/Colors';

import { DriverIcon, EndPoints, OneWay, RoundTripIcon, StartingPoints } from '../../assets/icons';
import { FontSize, FontsWeights } from '../../themes/Fonts';

import HeaderWithOption from '../Common/HeaderWithOption';
import C_Button from '../Common/C_Button';

const RecommendedBookings = () => {
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
                title="Recommended Bookings"
                drop={true}
                data={data}
                selectedValue={selectedValue}
                onChangeValue={handleValueChange}
            />
            <View style={styles.inercontainer}>
                <View style={styles.leftSection}>
                    <RoundTripIcon height={25} width={25} />
                </View>
                <View style={styles.middleSection}>
                    <Text style={styles.vehicleNumber}>Round Trip</Text>
                    <Text style={styles.vehicleModel}>Estimate Usage: 5 Hrs | Total Dist.: 85 km</Text>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.ratingValue}>{"17-09-2024"}</Text>
                </View>
            </View>
            <View style={styles.inercontainer}>
                <View style={styles.leftSection2}>
                    <StartingPoints style={{marginBottom:20}}/>
                    <EndPoints style={{bottom:5, left:5}}/>
                </View>
                <View style={styles.middleSection}>
                    <Text style={[styles.vehicleModel,{marginBottom:20}]}>RR22, Block, Mianwali Nagar, paschim...</Text>
                    <Text style={styles.vehicleModel}>Main Rd, Block 1, West Patel Nagar, Patel...</Text>
                </View>
            </View>
            <C_Button title="₹1500/-" backgroundColor={Colors.lightP} text_color={Colors.primary} borderColor={Colors.primary} />
        </View>
    );
};

export default RecommendedBookings;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        margin: 13,
        borderRadius: 15,
        shadowColor: Colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems:"center",
        paddingHorizontal:20,
        paddingVertical:10
    },

    inercontainer: {
        // backgroundColor: Colors.lightP,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start', 
        borderBottomWidth: 0.4,
        // padding: 10,
        // marginHorizontal: 12,
        bottom: 5,
        borderRadius: 8,
        borderColor: Colors.black,
        marginBottom:15
    },
    leftSection: {
        backgroundColor:Colors.lightP,
        borderRadius:40,
        padding:10
    },
    leftSection2: {
        borderRadius:40,

        // padding:10
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
        backgroundColor:Colors.primary,
        padding:5,
        borderRadius:8
    },
    ratingValue: {
        fontSize: FontSize.FS17,
        fontWeight: '600',
        color: Colors.white,
    }
});

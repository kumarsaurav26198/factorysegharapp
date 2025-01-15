import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../themes/Colors';

import { FontSize, FontsWeights } from '../../themes/Fonts';

import HeaderWithOption from '../Common/HeaderWithOption';
import C_Button from '../Common/C_Button';

const SelectWorkingHours = () => {
    const [selectedHour, setSelectedHour] = useState(null);

    // Array of available working hours
    const workingHours = [
        { label: "3-4 Hours", value: "3-4" },
        { label: "7-8 Hours", value: "7-8" },
        { label: "More", value: "more" },
    ];

    return (
        <View style={styles.container}>
            <HeaderWithOption title="Select Working Hours" upArrow />
            <View style={styles.contentContainer}>
                <Text style={styles.vehicleModel}>
                    “How many hours do you wish to work?”
                </Text>
                <FlatList
                    data={workingHours}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.box,
                                selectedHour === item.value && styles.selectedBox
                            ]}
                            onPress={() => setSelectedHour(item.value)} 
                        >
                            <Text style={[styles.boxText,selectedHour===item.value && styles.selectedBoxText]}>{item.label}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.value} 
                />
                <C_Button title="Proceed" />
            </View>
        </View>
    );
};

export default SelectWorkingHours;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        margin: 13,
        borderRadius: 15,
        shadowColor: Colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        padding: 10,
    },
    contentContainer: {
        alignItems: 'center',
    },
    vehicleModel: {
        fontWeight: FontsWeights.FW500,
        color: Colors.black,
        alignSelf: 'flex-start',
        left: 10,
        marginBottom: 30
    },
    box: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: Colors.lightP, 
        borderRadius: 10, 
        marginHorizontal:12,
        marginBottom:20
    },
    selectedBox: {
        backgroundColor: Colors.primary,
    },
    boxText: {
        color: Colors.primary,
        fontSize:FontSize.FS15,
        fontWeight:FontsWeights.FW600
    },
    selectedBoxText: {
        color: Colors.white,
        fontSize:FontSize.FS15,
        fontWeight:FontsWeights.FW600
    },
});

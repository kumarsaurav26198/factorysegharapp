import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../themes/Colors';
import { FontSize, FontsWeights } from '../../themes/Fonts';

const Timeline = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Pickup & Destination</Text>
            <View style={styles.timelineItem}>
                <View style={styles.timeContainer}>
                    <View style={[styles.dot, { backgroundColor: "green" }]} />
                    <View style={styles.line} />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.statusText}>Started : 17 Sep 2024, 09:30 AM</Text>
                    <Text style={styles.location}>
                        RR22, Block, Mianwali Nagar, paschim Vihar, New delhi 1100...
                    </Text>
                </View>
            </View>
            <View style={styles.timelineItem}>
                <View style={styles.timeContainer}>
                    <View style={[styles.dot, { backgroundColor: "red" }]} />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.statusText}>Ended :17 Sep 2024, 10:30 AM</Text>
                    <Text style={styles.location}>
                        Main Rd, Block 1, West Patel Nagar, Patel Nagar, Delhi, 110008, India
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Timeline;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 8,
        margin:15
    },
    header: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.primary,
        marginBottom: 10,
    },
    timelineItem: {
        flexDirection: 'row',
    },
    timeContainer: {
        alignItems: 'center',
        marginRight: 16,
    },
    statusText: {
        fontSize: FontSize.FS14,
        fontWeight: FontsWeights.FW500,
        color: Colors.black,
    },
    dot: {
        width: 14,
        height: 14,
        borderRadius: 7,
    },
    line: {
        width: 1,
        height: 60,
        backgroundColor: Colors.lightgrey,
    },
    contentContainer: {
        flex: 1,
    },
    location: {
        fontSize:FontSize.FS14,
        fontWeight: FontsWeights.FW400,
        color: Colors.black,
        marginTop: 10,
    },
});

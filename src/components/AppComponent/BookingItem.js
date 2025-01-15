import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Colors from '../../themes/Colors';
import { FontSize, FontsWeights } from '../../themes/Fonts';
import { OneWay, StartingPoints } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';

const BookingItem = ({ handlePressRemove,  }) => {
    const navigation = useNavigation();
    // TakeBooking

    const handlePressAccept=()=>{
        navigation.navigate("TakeBooking")
    }
    return (
        <View style={styles.container}>
            <View style={styles.inercontainer}>
                <View style={styles.leftSection}>
                    <OneWay height={25} width={25} />
                </View>
                <View style={styles.middleSection}>
                    <Text style={styles.vehicleNumber}>4 Hours</Text>
                    <Text style={styles.vehicleModel}>One way trip</Text>
                </View>
                <View style={styles.rightSection}>
                    <Text style={styles.ratingValue}>{'17-09-2024'}</Text>
                    <Text style={styles.vehicleModel}>Today</Text>
                </View>
            </View>
            <Text style={styles.ratingValue}>
                {'Accept within 9:15 AM - 9:35 AM'}
            </Text>
            <TouchableOpacity style={styles.btnCon}>
                <Text style={styles.btnText}>Min Earn: ₹250</Text>
            </TouchableOpacity>
            <View style={styles.pointsDescriptionContainer}>
                <StartingPoints />
                <Text style={styles.description}>
                    RR22, Block, Mianwali Nagar, paschim...
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handlePressRemove}>
                    <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
                <View style={styles.verticalBorder} />
                <TouchableOpacity style={styles.button} onPress={handlePressAccept}>
                    <Text style={[styles.buttonText, { color: Colors.primary }]}>Accept</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BookingItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: 8,
        marginHorizontal: 20,
        padding: 10,
        paddingTop: 20,
        paddingHorizontal: 15,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom:20
    },
    inercontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        bottom: 5,
        borderRadius: 8,
        marginBottom: 16,
    },
    leftSection: {
        backgroundColor: Colors.lightP,
        borderRadius: 40,
        padding: 10,
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
    },
    vehicleModel: {
        fontWeight: FontsWeights.FW500,
        color: Colors.black,
    },
    rightSection: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ratingValue: {
        fontSize: FontSize.FS15,
        fontWeight: '600',
        color: Colors.primary,
    },
    btnCon: {
        backgroundColor: Colors.primary,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    pointsDescriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        paddingTop: 15,
        marginTop:20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    description: {
        fontSize: FontSize.FS14,
        fontWeight: FontsWeights.FW400,
        color: Colors.darkgrey,
        marginLeft: 5, 
    },
    btnText: {
        color: Colors.white,
        fontWeight: FontsWeights.FW600,
        fontSize: FontSize.FS14,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 10,
    },
    button: {
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: FontSize.FS18,
        fontWeight: FontsWeights.FW600,
        color: Colors.red,
    },
    verticalBorder: {
        width: 1,
        backgroundColor: '#ccc',
        height: '100%', 
        marginHorizontal: 10, 
    },
});

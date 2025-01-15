import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../themes/Colors';
import { FontSize, FontsWeights } from '../../themes/Fonts';
import { DoneIcon, InfoIcon } from '../../assets/icons';

const BookingCancelled = ({ handlePressBookingCancelled }) => {
    const [ ratingValue, setRatingValue ] = useState(3.8);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Are you sure?</Text>
                <InfoIcon fill="red" />
            </View>
            <Text style={styles.description}>
                By continuing, all the documents and information you’ve entered will be deleted.
            </Text>
            <TouchableOpacity style={styles.proceedButton} onPress={handlePressBookingCancelled}>
                <Text style={styles.proceedButtonText}>Yes! Cancel Application</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.proceedButton2} onPress={handlePressBookingCancelled}>
                <Text style={[styles.proceedButtonText,{color:Colors.black}]}>No! Go back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default BookingCancelled;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        paddingVertical: 12,
        paddingHorizontal: 20,
        width: '100%',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    headerText: {
        fontSize: FontSize.FS20,
        fontWeight: FontsWeights.FW600,
        color: Colors.black,
        textAlign: 'left',
        marginTop: 10,
    },
    description: {
        fontSize: FontSize.FS14,
        fontWeight: FontsWeights.FW400,
        color: Colors.darkgrey,
        textAlign: 'left',
        marginTop: 10,
        width: '75%',
    },
    proceedButton: {
        backgroundColor: Colors.primary,
        borderRadius: 5,
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
        marginTop: 25,
    },
    proceedButton2: {
        backgroundColor: Colors.white,
        borderRadius: 5,
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
        marginTop: 25,
        borderWidth: 0.2,
        
        // Shadow properties for iOS
        shadowColor: Colors.lightP, // Shadow color
        shadowOffset: {
            width: 0,
            height: 20, // Offset for shadow height
        },
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.5, // Blur radius
    
        elevation: 5, 
    },
    
    proceedButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

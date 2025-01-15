import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../themes/Colors';
import { FontSize, FontsWeights } from '../../themes/Fonts';
// import StarRating from 'react-native-star-rating-widget';

const AddReview = ({ handlePressAddReview }) => {
    const [ratingValue, setRatingValue] = useState(3.8);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>How was your trip?</Text>
            <Text style={styles.description}>
                Your booking has been confirmed. Driver will pick you up in 2 minutes.
            </Text>
            {/* <StarRating
                rating={ratingValue}
                onChange={setRatingValue}
                maxStars={5}
                color={Colors.primary}
                starSize={47}
            /> */}
            <TouchableOpacity style={styles.proceedButton} onPress={handlePressAddReview}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddReview;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        paddingVertical: 12,
        alignItems: 'center',
        paddingHorizontal: 20, 
        width: '100%', 
    },
    headerText: {
        fontSize: FontSize.FS20,
        fontWeight: FontsWeights.FW600,
        color: Colors.black,
        textAlign: 'center',
        marginTop: 10,
    },
    description: {
        fontSize: FontSize.FS14,
        fontWeight: FontsWeights.FW400,
        color: Colors.darkgrey,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 50,
    },
    proceedButton: {
        backgroundColor: Colors.primary,
        borderRadius: 5,
        paddingVertical: 15,
        width: '100%', 
        alignItems: 'center',
        marginTop: 25, 
    },
    proceedButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

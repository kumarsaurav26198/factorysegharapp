import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { DriverIcon } from '../../assets/icons';
import { FontSize, FontsWeights } from '../../themes/Fonts';
import Colors from '../../themes/Colors';
import { useNavigation } from '@react-navigation/native';
// import StarRating from 'react-native-star-rating-widget';

export default function DriverInfo() {
    const navigation = useNavigation();
    const ratingValue = 3.8;

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.infoContainer} 
                onPress={() => navigation.navigate("Profile")}
            >
                <View style={styles.leftSection}>
                    <DriverIcon height={45} width={45} />
                </View>

                <View style={styles.middleSection}>
                    <Text style={styles.vehicleNumber}>Mohan Gupta</Text>
                    <Text style={styles.vehicleModel}>ID: #1323467789</Text>
                </View>

                <View style={styles.rightSection}>
                    {/* <StarRating
                        disabled={true}
                        onChange={() => { }}
                        maxStars={1}
                        rating={ratingValue}
                        color={Colors.primary}
                        starSize={20}
                        starStyle={{marginTop:5}}
                    /> */}
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
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center", 
        borderWidth:1,
        padding:10,
        borderRadius:8,
        borderColor:Colors.primary
        // marginBottom: 16,

    },
    leftSection: {
        marginRight: 15, // Spacing between icon and text
    },
    middleSection: {
        flex: 1, // Take up remaining space between the left and right sections
        justifyContent: 'center',
    },
    rightSection: {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    vehicleNumber: {
        fontSize: FontSize.FS18,
        fontWeight: FontsWeights.FW600,
        color: Colors.black,
        marginBottom: 8,
    },
    vehicleModel: {
        fontWeight: FontsWeights.FW500,
        color: '#666',
        marginBottom: 8,
        marginRight: 10,
    },
    ratingValue: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primary,
        // marginTop: 14,
    },
});

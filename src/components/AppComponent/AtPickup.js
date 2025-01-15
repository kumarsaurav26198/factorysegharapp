import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Colors from '../../themes/Colors';
import { ContactUsIcon, DurationIcon, EditProfileIcon, EndPoints, GetDirection, IDCardIcon } from '../../assets/icons';
import { FontSize, FontsWeights } from '../../themes/Fonts';
import { useNavigation } from '@react-navigation/native';
import C_Button from '../Common/C_Button';

const AtPickup = ({ item }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <View style={styles.iconContainer}>
                        <DurationIcon fill={Colors.primary} />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.name}>Starts in</Text>
                    </View>
                    <Text style={styles.subText}>10:15 AM</Text>
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.iconContainer}>
                        <EditProfileIcon width={25} height={25} fill={Colors.primary} />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.name}>Customer Name</Text>
                    </View>
                    <Text style={styles.subText} numberOfLines={1}>John Smith</Text>
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.iconContainer}>
                        <EndPoints size={24} color={Colors.black} />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.name} numberOfLines={1}>
                            Main Rd, Block 1, West Patel Nagar, Patel...
                        </Text>
                    </View>
                </View>
            </View>
            <View
                style={styles.infoContainer}
            // onPress={() => navigation.navigate("DriverDetail")}
            >
                <TouchableOpacity style={styles.section}>
                    <ContactUsIcon />
                    <Text style={styles.vehicleNumber}>Contact</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.section}>
                    <GetDirection />
                    <Text style={styles.vehicleNumber}>Get Direction</Text>
                </TouchableOpacity>

                <View style={styles.divider} />
                <TouchableOpacity style={styles.section}>
                    <IDCardIcon />
                    <Text style={styles.vehicleNumber}>ID Card</Text>
                </TouchableOpacity>
            </View>



            <C_Button
                marginTop={10}
                title="At Pickup"
                onPress={() => navigation.navigate("RequiredAuthentication")}
            />
        </View>
    );
};

export default AtPickup;

const styles = StyleSheet.create({
    wrapper: {
        margin: 20,
    },
    container: {
        borderWidth: 0.5,
        borderColor: Colors.primary,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: Colors.lightP,
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 0.4,
        borderBottomColor: Colors.darkgrey,
        padding: 10
    },

    iconContainer: {
        marginRight: 12,

    },

    detailsContainer: {
        flex: 1,
    },

    name: {
        color: Colors.black,
        fontSize: FontSize.FS16,
        fontWeight: FontsWeights.FW500,
    },

    subText: {
        fontSize: FontSize.FS14,
        color: Colors.black,
        marginTop: 2,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: "center",
        borderWidth: 1,
        padding: 7,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderColor: Colors.primary,
        marginTop: 20,
        marginBottom: 30
    },
    section: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center"
    },
    divider: {
        width: 1,
        height: '90%',
        backgroundColor: Colors.primary,
        // marginHorizontal: 10, 
    },
    vehicleNumber: {
        fontSize: FontSize.FS16,
        fontWeight: FontsWeights.FW600,
        color: Colors.primary,
        marginBottom: 8,
    },
});

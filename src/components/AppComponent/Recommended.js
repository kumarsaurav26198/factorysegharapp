import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../themes/Colors';
import { EndPoints, RupessInon, StartingPoints } from '../../assets/icons';
import { FontSize, FontsWeights } from '../../themes/Fonts';

import { useNavigation } from '@react-navigation/native';
import C_Button from '../Common/C_Button';

const Recommended = ({ item }) => {
    const navigation=useNavigation()
    return (
        <View style={{alignItems:"center",paddingVertical:20}}>
            <View style={styles.itemContainer}>
                <View style={styles.iconContainer}>
                    <StartingPoints size={24} color="#000" />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>Pickup</Text>
                    <Text style={styles.subText} numberOfLines={1}>RR22, Block, Mianwali Nagar, Paschim Vihar, Delhi</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>07:45 AM | 9.69 KM | 60 min</Text>
                </View>
            </View>
            <View style={styles.itemContainer}>
                <View style={styles.iconContainer}>
                    <EndPoints size={24} color="#000" />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>Drop</Text>
                    <Text style={styles.subText} numberOfLines={1}>Main Rd, Block 1, West Patel Nagar, Patel Nagar, Delhi</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.subText} numberOfLines={1}>08:30 AM | 10.5 KM | 70 min</Text>
                </View>
            </View>
            <View style={styles.itemContainer}>
                <View style={styles.iconContainer}>
                    <RupessInon size={24} color="#000" />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={[ styles.name, { color: Colors.primary } ]}>₹250 </Text>
                    <Text style={styles.subText} numberOfLines={1}>Your estimated earnings</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>+₹250 </Text>
                </View>
            </View>
            <C_Button  marginTop={30} title="Accept Booking" onPress={()=>navigation.navigate("On_the_way")}/>
            <C_Button  backgroundColor={Colors.lightP} title="Ignore Booking" text_color={Colors.primary} onPress={()=>navigation.goBack()} />
        </View>
    );
};

export default Recommended;

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: Colors.white,
        borderRadius: 8,
        marginTop: 20,
        padding: 10,
        borderColor: Colors.gray,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderWidth: 2,
        backgroundColor: Colors.lightPrimary,
    },
    iconContainer: {
        marginRight: 16,
        alignItems: 'flex-start',
    },
    detailsContainer: {
        flex: 3, 
    },
    name: {
        fontSize: FontSize.FS16,
        fontWeight: FontsWeights.FW500,
        marginBottom: 4,
        color: Colors.black,
    },
    subText: {
        fontSize: 12,
        color: Colors.black,
        flexShrink: 1, 
    },
    priceContainer: {
        flex: 2,
        alignItems: 'flex-end',
    },
    price: {
        fontSize: FontSize.FS14,
        fontWeight: FontsWeights.FW600,
        color: Colors.black,
    },
    totalprice: {
        fontSize: FontSize.FS12,
        fontWeight: FontsWeights.FW400,
        color: Colors.black,
        textDecorationLine: 'line-through',
    },
});

import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { CommonStyles } from '../../../themes/CommonStyles';
import { BackButton, C_Button } from '../../../components';
import { MasterCard, RupayCard, VisaCard } from '../../../assets/icons';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../../../themes/Colors';

const CardDetail = () => {
    const [ isSelected, setSelection ] = useState(false);
    return (
        <View style={CommonStyles.container}>
            <BackButton left text="Enter card detail" />
            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Card Number</Text>
                </View>
                <View style={styles.cardIcons}>
                    <VisaCard width={40} height={25} />
                    <MasterCard width={40} height={25} />
                    <RupayCard width={40} height={25} />
                </View>
            </View>
            <View style={CommonStyles.bottomView}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'flex-start',
                        paddingHorizontal: 20,
                        marginBottom: 10,
                    }}>
                    <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        tintColors={{ true: Colors.green, false: Colors.black }}
                    />
                    <Text style={[ styles.text, { fontWeight: '500', left: 10 } ]}>
                        Save card as per new RBI Guideline Know more
                    </Text>
                </View>
                <Text style={styles.text}>
                    We will verify your card with a nominal refundable fee
                </Text>
                <C_Button title="Add card" />
            </View>
        </View>
    );
};

export default CardDetail;

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: Colors.black,
    },
    content: {
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal: 20,
        paddingTop: 20,
        alignItems:"center"
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#666666',
    },
    cardIcons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
});

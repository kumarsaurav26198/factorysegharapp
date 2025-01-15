import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FontSize, FontsWeights } from '../../themes/Fonts';
import Colors from '../../themes/Colors';
import { Close, DoneIcon } from '../../assets/icons';
import C_Text from '../Common/C_Text';


const AddSuccess = ({ handlePressDone, handlePressClose }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePressClose} style={styles.Closecon}>
                <Close />
            </TouchableOpacity>
            <DoneIcon />
            <Text style={styles.headerText}>Add Success</Text>
            <Text style={styles.description}>
                Your money has been add successfully
            </Text>
            <Text style={styles.description}>Amount</Text>
            <C_Text
                content="₹450"
                bold
                style={{ color: Colors.primary, fontSize: FontSize.FS22 }}
            />
            <TouchableOpacity style={styles.button} onPress={handlePressDone}>
                <Text style={[ styles.buttonText, { color: Colors.white } ]}>Done</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddSuccess;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        paddingVertical: 12,
        alignItems: 'center',
    },
    Closecon: {
        alignSelf: "flex-end"
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
        paddingHorizontal: 20,
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
        alignItems: 'center',
        backgroundColor: Colors.primary,
        marginVertical: 10,
        borderRadius: 9,
    },
    buttonText: {
        fontSize: FontSize.FS16,
        fontWeight: FontsWeights.FW600,
        color: Colors.black,
        paddingHorizontal: 40,
        paddingVertical: 10,
    },
    verticalBorder: {
        width: 1,
        height: '100%',
        backgroundColor: '#ccc',
    },
});

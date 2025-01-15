import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { CommonStyles } from '../../../themes/CommonStyles';
import { connect } from 'react-redux';
import { BackButton, C_Button, C_Text, C_TextInput } from '../../../components';
import { useActions } from '../../../hooks/useActions';
import Colors from '../../../themes/Colors';
import { FontSize, FontsWeights } from '../../../themes/Fonts';

const DrivingLicenseNumber = ({ loginRes, navigation }) => {
    const { loginRequest } = useActions();
    const [ errorMessage, setErrorMessage ] = useState('');

    const handlePressContinue = () => {
        // navigation.navigate("DrivingLicenseNumber");
    };

    return (
        <View style={[ CommonStyles.container ]}>
            <BackButton left text="Driving License Number" />
            <FlatList
                data={[ 1 ]}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <View style={styles.container}>
                        <View style={styles.textHeaderContainer}>
                            <C_Text content="Please Enter Driving License Number" style={styles.medium} />
                            <C_TextInput
                                placeholder="Driver License number"
                            // value={name}
                            // onChangeText={(txt) => setName(txt)}
                            />
                            <C_Text content="Date of birth" style={styles.medium} />
                            <C_TextInput
                                placeholder="Select Date"
                            // value={name}
                            // onChangeText={(txt) => setName(txt)}
                            />
                        </View>


                        {errorMessage ? <Text style={CommonStyles.errorText}>{errorMessage}</Text> : null}
                        {loginRes?.error ? <Text style={CommonStyles.errorText}>{loginRes?.error?.message}</Text> : null}
                    </View>
                )}
                ListFooterComponent={<View style={styles.listFooter} />}
            />

            <View style={[ CommonStyles.bottomView, styles.bottomView ]}>
                <C_Button title="Done" onPress={handlePressContinue} loading={loginRes?.loading} />
            </View>
        </View>
    );
};

const mapStateToProps = (state) => ({
    loginRes: state?.loginReducers,
});

export default connect(mapStateToProps)(DrivingLicenseNumber);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    textHeaderContainer: {
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 30
    },
    medium: {
        textAlign: 'left',
        fontSize: 14,
        fontWeight: '400',
        marginTop: 10,
        marginBottom: 10,
    },
    listFooter: {
        height: 150,
    },
    bottomView: {
        paddingHorizontal: 20,
    },
});


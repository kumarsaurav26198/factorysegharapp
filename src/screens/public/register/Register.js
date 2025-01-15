import {  FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommonStyles } from '../../../themes/CommonStyles';
import { RegisterIcon } from '../../../assets/icons';
import { connect } from 'react-redux';
import { C_Button, C_Text, C_TextInput, } from '../../../components';
import { useActions } from '../../../hooks/useActions';
import Colors from '../../../themes/Colors';
import { FontSize, FontsWeights } from '../../../themes/Fonts';
import { validateRegistration } from '../../../utils/validators';
import { useRoute } from '@react-navigation/native';

const Register = ({ loginRes }) => {

    const route = useRoute();
    const { mobile } = route?.params; 
    const { registerRequest, registerReset } = useActions();
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ name, setName ] = useState('Saurav Kumar');
    const [ email, setEmail ] = useState('');
    const [ refcode, setRefcode ] = useState('mohitvijay8888');

    useEffect(() => {
        registerReset();
    }, []);

    const handlePressNext = () => {
        const { isValid, errorMessage } = validateRegistration(name, email, mobile, refcode);
        if (isValid)
        {
            const payload = {
                "fullName": name,
                "email": email,
                "mobile": mobile,
                "referralCode": refcode
            };
            console.log(payload)
            registerRequest(payload);
            setErrorMessage('');
        } else
        {
            setErrorMessage(errorMessage);
        }
    };

    return (
        <View style={[ CommonStyles.container ]}>
            <FlatList
                data={[ 1 ]}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <View style={styles.container}>
                        <RegisterIcon />
                        <C_Text content="Complete Profile" style={styles.medium} />
                        {errorMessage ? <Text style={CommonStyles.errorText}>{errorMessage}</Text> : null}
                        {loginRes?.error ? (<Text style={CommonStyles.errorText}>{loginRes?.error?.message}</Text>) : null}
                        <View style={styles.textHeaderContainer}>
                            <C_Text content="Full Name" style={styles.otpmessage} />
                            <C_TextInput
                                placeholder="John Smith"
                                value={name}
                                onChangeText={(txt) => setName(txt)}
                            />
                        </View>
                        <View style={styles.textHeaderContainer}>
                            <C_Text content="Your Email" style={styles.otpmessage} />
                            <C_TextInput
                                placeholder="johnsmith99@gmail.com"
                                value={email}
                                onChangeText={(txt) => setEmail(txt)}
                            />
                        </View>
                        <View style={styles.textHeaderContainer}>
                            <C_Text content="Referral code" style={styles.otpmessage} />
                            <C_TextInput
                                placeholder="Referral code (optional)"
                                value={refcode}
                                onChangeText={(txt) => setRefcode(txt)}
                            />
                        </View>
                        <View style={[ styles.textHeaderContainer, { paddingTop: 0 } ]}>
                            <Text style={styles.termCond}>
                                By continuing, you agree to Factory Se Home
                            </Text>
                            <TouchableOpacity>
                                <Text style={[ styles.termCond, styles.termCond2 ]}>
                                    Terms & Conditions
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListFooterComponent={<View style={{ height: 150 }} />}
            />

            <View style={[ CommonStyles.bottomView, { paddingHorizontal: 20 } ]}>
                <C_Button
                    title="Complete Profile"
                    onPress={handlePressNext}
                    loading={loginRes?.loading}
                />
            </View>
        </View>
    );
};

const mapStateToProps = (state) => ({
    loginRes: state?.registerReducers,
});

export default connect(mapStateToProps)(Register);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 50,
        alignItems: 'center',
    },
    textHeaderContainer: {
        alignItems: 'flex-start',
        width: '100%',
    },
    medium: {
        marginTop: 10,
        marginBottom: 50,
        fontSize: FontSize.FS20,
        fontWeight: FontsWeights.FW500,
        textAlign: 'left',
    },
    otpmessage: {
        marginBottom: 10,
        textAlign: 'left',
        color: Colors.darkgrey,
    },
    termCond: {
        color: Colors.primary,
        fontWeight: FontsWeights.FW400,
        fontSize: FontSize.FS14,
    },
    termCond2: {
        textDecorationLine: 'underline',
        fontWeight: FontsWeights.FW600,
    },
});

import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { CommonStyles } from '../../../themes/CommonStyles';
import { BackVerctor, Docs, InfoIcon } from '../../../assets/icons';
import { connect } from 'react-redux';
import { BackButton, C_Button, C_Text } from '../../../components';
import { useActions } from '../../../hooks/useActions';
import Colors from '../../../themes/Colors';
import { FontSize, FontsWeights } from '../../../themes/Fonts';
import { reset } from '../../../services/navigationService';
import { BookingCancelled, ModalWrapper } from '../../../components/Modal';

const UploadDocuments = ({ loginRes, navigation }) => {
    const { loginRequest } = useActions();
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ isModalVisible, setIsModalVisible ] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const documentsData = [
        {
            title: 'Registration Certificate (RC) for UP81Z8878',
            navigate: 'RegistrationRC',
        },
        { title: 'Driving License', navigate: 'DrivingLicense' },
        { title: 'Driver License number', navigate: 'DrivingLicenseNumber' },
        { title: 'Profile picture', navigate: 'Profilepicture' },
    ];

    const handlePressContinue = () => {
        reset([ { name: 'BottomNavigator' } ]);
        // navigation.navigate("Home");
    };
    const renderVehicleItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.vehicleCard}
                onPress={() => {
                    navigation.navigate(item.navigate);
                }}>
                <View style={styles.leftSection}>
                    <Text style={styles.vehicleTitle}>{item.title}</Text>
                    <View style={styles.statusContainer}>
                        <InfoIcon style={styles.infoIcon} />
                        <Text style={styles.statusText}>To be submitted</Text>
                    </View>
                </View>
                <BackVerctor
                    style={styles.rotatedIcon}
                    size={16}
                    color={Colors.black}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={[ CommonStyles.container ]}>
            <BackButton left text="Back" />
            <FlatList
                data={[ 1 ]}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <View style={styles.container}>
                        <View style={styles.textHeaderContainer}>
                            <Docs />
                            <C_Text content="Upload Documents" style={styles.medium} />
                            <C_Text content="Earnings are only a few steps away." />
                        </View>

                        <FlatList
                            data={documentsData}
                            keyExtractor={item => item.title}
                            renderItem={renderVehicleItem}
                        />

                        {errorMessage ? (
                            <Text style={CommonStyles.errorText}>{errorMessage}</Text>
                        ) : null}
                        {loginRes?.error ? (
                            <Text style={CommonStyles.errorText}>
                                {loginRes?.error?.message}
                            </Text>
                        ) : null}
                    </View>
                )}
                ListFooterComponent={<View style={{ height: 150 }} />}
            />

            <View style={[ CommonStyles.bottomView, { paddingHorizontal: 20 } ]}>
                <C_Button
                    title="Continue"
                    onPress={handlePressContinue}
                    loading={loginRes?.loading}
                />
                <TouchableOpacity onPress={toggleModal}>
                    <C_Text
                        content="Cancel Application"
                        style={[ styles.medium, { marginVertical: 0 } ]}
                    />
                </TouchableOpacity>
            </View>
            <ModalWrapper visible={isModalVisible} onRequestClose={toggleModal}>
                <BookingCancelled handlePressBookingCancelled={() => { toggleModal(); }} />
            </ModalWrapper>
        </View>
    );
};

const mapStateToProps = state => ({
    loginRes: state?.loginReducers,
});
export default connect(mapStateToProps)(UploadDocuments);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    textHeaderContainer: {
        alignItems: 'flex-start',
        width: '100%',
        paddingVertical: 20,
        marginBottom: 10,
    },
    medium: {
        textAlign: 'left',
        fontSize: FontSize.FS16,
        fontWeight: FontsWeights.FW500,
    },
    vehicleCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightgrey, // Adjust the color based on your theme
    },
    leftSection: {
        flexDirection: 'column',
        flex: 1,
    },
    vehicleTitle: {
        fontSize: FontSize.FS16,
        fontWeight: FontsWeights.FW500,
        color: Colors.black, // Adjust the color based on your theme
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    infoIcon: {
        marginRight: 5, // Space between the icon and the text
    },
    statusText: {
        fontSize: FontSize.FS14,
        color: Colors.gray, // Adjust the color based on your theme
    },
    rotatedIcon: {
        transform: [ { rotate: '180deg' } ],
    },
});

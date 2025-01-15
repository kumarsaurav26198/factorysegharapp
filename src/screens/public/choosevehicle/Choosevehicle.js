import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { CommonStyles } from '../../../themes/CommonStyles';
import { AutoRickshaw, Docs, InfoIcon, TwoWheeler, WhiteCar } from '../../../assets/icons';
import { connect } from 'react-redux';
import { BackButton, C_Button, C_Text } from '../../../components';
import { useActions } from '../../../hooks/useActions';
import Colors from '../../../themes/Colors';
import { FontSize, FontsWeights } from '../../../themes/Fonts';

const ChooseVehicle = ({ loginRes, navigation }) => {
    const { loginRequest } = useActions();
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ selectedVehicle, setSelectedVehicle ] = useState(null);

    const handleSelectVehicle = (vehicleType) => {
        setSelectedVehicle(vehicleType);
        setErrorMessage('');
    };

    const vehicleData = [
        { title: "Car", Icon: WhiteCar },
        { title: "Two Wheeler", Icon: TwoWheeler },
        { title: "Auto-rickshaw", Icon: AutoRickshaw },
    ];

    const handlePressContinue = () => {
        navigation.navigate("UploadDocuments");
    };

    const renderVehicleItem = ({ item }) => {
        const IconComponent = item.Icon;
        const isSelected = selectedVehicle === item.title;

        return (
            <TouchableOpacity
                style={[
                    styles.vehicleCard,
                    isSelected && { borderColor: Colors.primary, borderWidth: 2 }
                ]}
                onPress={() => handleSelectVehicle(item.title)}
            >
                <IconComponent />
                <Text style={[ styles.vehicleText, isSelected && { fontWeight: FontsWeights.FW600, fontSize: FontSize.FS16 } ]}>
                    {item.title}
                </Text>
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
                            <C_Text content="Please enter your vehicle detail" style={styles.medium} />
                            <C_Text content="Which vehicle will you be driving?" style={styles.medium} />
                        </View>

                        <FlatList
                            data={vehicleData}
                            numColumns={2}
                            keyExtractor={(item) => item.title}
                            renderItem={renderVehicleItem}
                            contentContainerStyle={styles.vehicleList}
                        />
                        <View style={[ styles.bottomContainer, { justifyContent: "space-between", marginTop: 30 } ]}>
                            <C_Text content="Vehicle registration number" style={styles.medium} />
                            <InfoIcon />
                        </View>
                        <View style={[ styles.bottomContainer, { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.primary } ]}>
                            <InfoIcon />
                            <C_Text content="You can add more vehicle after completing the on boarding process" style={[ styles.medium, { paddingLeft: 20 } ]} />
                        </View>

                        {errorMessage ? <Text style={CommonStyles.errorText}>{errorMessage}</Text> : null}
                        {loginRes?.error ? <Text style={CommonStyles.errorText}>{loginRes?.error?.message}</Text> : null}
                    </View>
                )}
                ListFooterComponent={<View style={{ height: 100 }} />}
            />

            <View style={[ CommonStyles.bottomView, { paddingHorizontal: 20 } ]}>
                <C_Button title="Continue" onPress={handlePressContinue} loading={loginRes?.loading} />
            </View>
        </View>
    );
};

const mapStateToProps = (state) => ({
    loginRes: state?.loginReducers,
});
export default connect(mapStateToProps)(ChooseVehicle);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    textHeaderContainer: {
        alignItems: 'flex-start',
        width: '100%',
        paddingVertical: 20,
        marginBottom: 10,
    },
    medium: {
        marginTop: 10,
        textAlign: 'left',
        marginBottom: 10,
        fontSize: FontSize.FS16,
        fontWeight: FontsWeights.FW500,
    },
    vehicleList: {
        width: '100%',
    },
    vehicleCard: {
        width: '45%',
        height: 100,
        margin: 10,
        backgroundColor: Colors.lightP,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.lightP,

    },
    vehicleText: {
        marginTop: 10,
        fontSize: FontSize.FS14,
        fontWeight: FontsWeights.FW500,
        color: Colors.black
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: Colors.lightP,
        flexDirection: 'row',
        width: "100%",
        marginTop: 20,
        alignItems: "center",
        borderRadius: 8
    }
});

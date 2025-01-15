import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
} from 'react-native';
import { connect } from 'react-redux';
import { useActions } from '../../../hooks/useActions';
import { CommonStyles } from '../../../themes/CommonStyles';
import { C_Button, C_Text, BackButton } from '../../../components';
import { FontSize, FontsWeights } from '../../../themes/Fonts';
import { AddProfileUpload, Close, UploadProfile } from '../../../assets/icons';
import Colors from '../../../themes/Colors';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { requestCameraPermission } from '../../../utils/helpers';

const ProfilePictureScreen = ({ loginRes, navigation }) => {
    const { loginRequest } = useActions();
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ cameraActive, setCameraActive ] = useState(false);
    const [ profilePicture, setProfilePicture ] = useState(null);
    const cameraRef = useRef(null);
    const device = useCameraDevice('back');

    const handlePressContinue = () => {
        // Add your upload logic here or navigate to another screen
        if (profilePicture)
        {
            console.log('Proceed with uploading:', profilePicture);
            // For example: navigation.navigate("NextScreen");
        } else
        {
            setErrorMessage('Please capture or upload a profile picture.');
        }
    };

    const captureImage = async () => {
        if (cameraRef.current && device)
        {
            try
            {
                const photo = await cameraRef.current.takePhoto({
                    qualityPrioritization: 'quality',
                });
                const source = { uri: `file://${ photo.path }` };
                setProfilePicture(source);
                setCameraActive(false);
            } catch (error)
            {
                console.error('Error capturing photo:', error);
            }
        }
    };

    const handleCameraToggle = async () => {
        await requestCameraPermission();

        setCameraActive(!cameraActive);
    };

    if (cameraActive && device)
    {
        return (
            <View style={StyleSheet.absoluteFill}>
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    ref={cameraRef}
                    isActive={cameraActive}
                    photo={true}
                />
                <TouchableOpacity
                    onPress={captureImage}
                    style={styles.captureButton}></TouchableOpacity>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setCameraActive(false)}>
                    <Close fill="#fff" />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={CommonStyles.container}>
            <BackButton left text="Profile picture" />
            <FlatList
                data={[ 1 ]} // dummy data to render flatlist
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <View style={styles.container}>
                        <View style={styles.textHeaderContainer}>
                            <C_Text
                                content="Make sure your photos are entirely visible, glare-free, and not blurred."
                                style={styles.medium}
                            />
                        </View>
                        <View style={styles.uploadButton}>
                            {profilePicture ? (
                                <Image
                                    source={profilePicture}
                                    style={styles.uploaddeImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <UploadProfile />
                            )}
                        </View>
                        <TouchableOpacity
                            style={[ styles.uploadButto2 ]}
                            onPress={handleCameraToggle}>
                            <AddProfileUpload />
                        </TouchableOpacity>
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
                ListFooterComponent={<View style={styles.listFooter} />}
            />
            <View style={[ CommonStyles.bottomView, styles.bottomView ]}>
                <C_Button
                    title="Upload"
                    onPress={handlePressContinue}
                    loading={loginRes?.loading}
                />
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <C_Text content="Upload Later" style={styles.uploadLater} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const mapStateToProps = state => ({
    loginRes: state?.loginReducers,
});

export default connect(mapStateToProps)(ProfilePictureScreen);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    textHeaderContainer: {
        alignItems: 'flex-start',
        width: '100%',
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
    uploadLater: {
        textAlign: 'center',
        fontSize: FontSize.FS16,
        fontWeight: FontsWeights.FW500,
        marginTop: 10,
    },
    uploadButton: {
        height: 120,
        width: 120,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 60,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightP,
        borderStyle: 'dashed',
        alignSelf: 'center',
        marginTop: 20,
        overflow: 'hidden',
    },
    uploaddeImage: {
        height: '100%',
        width: '100%',
        padding: 2,
    },
    uploadButto2: {
        height: 20,
        width: 20,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        left: 40,
        top: -40,
        backgroundColor: Colors.white,
    },
    captureButton: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        borderRadius: 50,
        zIndex: 10,
        height: 60,
        width: 60,
        backgroundColor: Colors.lightP,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        height: 30,
        width: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: Colors.black,
    },
});

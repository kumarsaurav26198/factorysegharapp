import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {CommonStyles} from '../../../themes/CommonStyles';
import {connect} from 'react-redux';
import {BackButton, C_Button, C_Text} from '../../../components';
import {useActions} from '../../../hooks/useActions';
import Colors from '../../../themes/Colors';
import {FontSize, FontsWeights} from '../../../themes/Fonts';
import {Close, UploadDoc} from '../../../assets/icons';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import { requestCameraPermission } from '../../../utils/helpers';

const RegistrationRC = ({loginRes, navigation}) => {
  const {loginRequest} = useActions();
  const [errorMessage, setErrorMessage] = useState('');

  const [frontRCImage, setFrontRCImage] = useState(null);
  const [backRCImage, setBackRCImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const cameraRef = useRef(null);

  const device = useCameraDevice('back');

  const captureImage = async () => {
    if (cameraRef.current && device) {
      try {
        const photo = await cameraRef.current.takePhoto({
          qualityPrioritization: 'quality',
        });
        const source = {uri: `file://${photo.path}`};

        if (selectedImage === 'front') {
          setFrontRCImage(source);
        } else if (selectedImage === 'back') {
          setBackRCImage(source);
        }

        setCameraActive(false);
      } catch (error) {
        console.error('Error capturing photo:', error);
      }
    }
  };

  const handleCameraPress = async imageType => {
 await requestCameraPermission();
    setSelectedImage(imageType);
    setCameraActive(true);
  };

  const handlePressUpload = () => {
    if (!frontRCImage || !backRCImage) {
      setErrorMessage('Please upload both sides of the RC.');
      return;
    }

    console.log('Proceed with uploading images:', {frontRCImage, backRCImage});
    navigation.navigate('UploadDocuments');
    // Add your upload logic here
  };

  if (cameraActive && device) {
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
    <View style={[CommonStyles.container]}>
      <BackButton left text="Registration Certificate (RC)" />
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={styles.container}>
            <View style={styles.textHeaderContainer}>
              <C_Text
                content="We require your vehicle registration certificate for verification purpose."
                style={styles.medium}
              />
            </View>
            <View style={styles.textHeaderContainer}>
              <C_Text
                content="For Brand New Vehicle Onboarding"
                style={styles.medium}
              />
            </View>

            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => handleCameraPress('front')}>
              {frontRCImage ? (
                <Image source={frontRCImage} style={styles.uploadedImage} />
              ) : (
                <>
                  <UploadDoc style={styles.uploadIcon} />
                  <C_Text
                    content="Upload front side of RC"
                    style={styles.uploadText}
                  />
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => handleCameraPress('back')}>
              {backRCImage ? (
                <Image source={backRCImage} style={styles.uploadedImage} />
              ) : (
                <>
                  <UploadDoc style={styles.uploadIcon} />
                  <C_Text
                    content="Upload back side of RC"
                    style={styles.uploadText}
                  />
                </>
              )}
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

      <View style={[CommonStyles.bottomView, styles.bottomView]}>
        <C_Button
          title="Upload"
          onPress={handlePressUpload}
          loading={loginRes?.loading}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <C_Text content="Upload Later" style={styles.uploadLater} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  loginRes: state?.loginReducers,
});

export default connect(mapStateToProps)(RegistrationRC);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  textHeaderContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 30,
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
    paddingVertical: 20,
  },
  uploadLater: {
    textAlign: 'left',
    fontSize: FontSize.FS16,
    fontWeight: FontsWeights.FW500,
  },
  uploadButton: {
    height: 100,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightPurpleBackground,
    borderStyle: 'dashed',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  uploadIcon: {
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.purple,
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

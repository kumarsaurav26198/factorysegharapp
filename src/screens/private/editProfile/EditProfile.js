import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {BackButton, C_Button, C_Text, C_TextInput} from '../../../components';
import {connect} from 'react-redux';
import Colors from '../../../themes/Colors';
import {FontSize, FontsWeights} from '../../../themes/Fonts';
import Images from '../../../utils/Images';
import {Camera} from '../../../assets/icons';
import {Dropdown} from 'react-native-element-dropdown';
import {ImageSelector, ModalWrapper} from '../../../components/Modal';
import {
  useCameraDevice,
  Camera as VisionCamera,
} from 'react-native-vision-camera';
import {launchImageLibrary} from 'react-native-image-picker';
import {useActions} from '../../../hooks/useActions';
import { CommonStyles } from '../../../themes/CommonStyles';

const EditProfile = ({userRes}) => {
  const {updateLoginUser} = useActions();

  const data = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ];

  const userData = userRes?.data;
  console.log('userData=====>>', JSON.stringify(userData, null, 2));

  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState(userData?.email || '');
  const [name, setName] = useState(userData?.driverName || '');
  const [address, setAddress] = useState(userData?.address || '');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [value, setValue] = useState(userData?.gender || '');
  const [isFocus, setIsFocus] = useState(false);
  const cameraRef = useRef(null);
  const device = useCameraDevice('back');

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handlePressUpdate = () => {
    const payload = {
      address,
      driverProfilePicUrl: selectedImage?.uri,
      driverName: name,
      gender: value,
    };
    // console.log("payload=====>>",JSON.stringify(payload,null,2))

    updateLoginUser(payload);
  };

  const handleCameraPress = () => {
    if (device) {
      setCameraActive(true);
    } else {
      console.warn('No camera device available.');
    }
  };

  const handleGalleryPress = async () => {
    const options = {mediaType: 'photo', quality: 1};

    try {
      const result = await launchImageLibrary(options);
      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
      } else {
        const selectedImageUri = result.assets[0]?.uri;
        const source = {uri: selectedImageUri};
        setSelectedImage(source);
        console.log('Selected image URI:', selectedImageUri);
      }
    } catch (error) {
      console.error('Error selecting image from gallery:', error);
    }
  };

  const captureImage = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({
          qualityPrioritization: 'quality',
        });
        const source = {uri: `file://${photo.path}`};
        setSelectedImage(source);
        setCameraActive(false);
      } catch (error) {
        console.error('Error capturing photo:', error);
      }
    }
  };
  return (
    <>
      {cameraActive ? (
        <View style={StyleSheet.absoluteFill}>
          <VisionCamera
            style={StyleSheet.absoluteFill}
            device={device}
            ref={cameraRef}
            isActive={cameraActive}
            photo
          />
          <TouchableOpacity onPress={captureImage} style={styles.captureButton}>
            <Text style={styles.captureText}>Capture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setCameraActive(false)}>
            <Text style={{color: '#fff'}}>Close</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
         {/* <View style={CommonStyles.container}>

         </View> */}
        </>
      )}
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: 10,
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  cameraCon: {
    height: 25,
    width: 25,
    backgroundColor: Colors.white,
    position: 'relative',
    right: 10,
    bottom: 40,
    left: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medium: {
    textAlign: 'center',
    bottom: 30,
  },
  bold: {
    // fontSize: FontSize.FS18,
    color: Colors.black,
    // fontWeight: FontsWeights.FW600,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 7,
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    borderColor: Colors.primary,
  },
  input: {
    flex: 1,
    // fontSize: FontSize.FS15,
    color: Colors.black,
    // fontWeight: FontsWeights.FW500,
  },
  captureButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    height: 60,
    width: 60,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureText: {
    // color: Colors.white,
    // fontSize: FontSize.FS16,
    // fontWeight: FontsWeights.FW600,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
  },
});

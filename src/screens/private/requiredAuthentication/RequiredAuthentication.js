import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { CommonStyles } from '../../../themes/CommonStyles';
import { BackButton, C_Button } from '../../../components';
import Colors from '../../../themes/Colors';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import Images from '../../../utils/Images';
import { Close } from '../../../assets/icons';

const RequiredAuthentication = ({ navigation }) => {
  const [ selfieImage, setSelfieImage ] = useState(null);
  const [ frontImage, setFrontImage ] = useState(null);
  const [ rightImage, setRightImage ] = useState(null);
  const [ leftImage, setLeftImage ] = useState(null);
  const [ cameraActive, setCameraActive ] = useState(false);
  const [ selectedImage, setSelectedImage ] = useState(null);
  const cameraRef = useRef(null);

  const device = useCameraDevice('back');

  const captureImage = async () => {
    if (cameraRef.current && device)
    {
      try
      {
        const photo = await cameraRef.current.takePhoto({
          qualityPrioritization: 'quality',
        });
        const source = { uri: `file://${ photo.path }` };

        switch (selectedImage)
        {
          case 'selfie':
            setSelfieImage(source);
            break;
          case 'front':
            setFrontImage(source);
            break;
          case 'right':
            setRightImage(source);
            break;
          case 'left':
            setLeftImage(source);
            break;
        }

        setCameraActive(false);
      } catch (error)
      {
        console.error('Error capturing photo:', error);
      }
    }
  };

  const handleCameraPress = (imageType) => {
    setSelectedImage(imageType);
    setCameraActive(true);
  };

  const allImagesCaptured = () => {
    return selfieImage && frontImage && rightImage && leftImage;
  };

  const handleUpload = () => {
    navigation.navigate("OnRoute");

    if (!allImagesCaptured())
    {
      console.log('Some images are missing!');
      return;
    }

    console.log('All images captured, proceed with upload.');
    navigation.navigate("OnRoute");
    // OnRoute
    // Your upload logic here
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
        <TouchableOpacity onPress={captureImage} style={styles.captureButton} />
        <TouchableOpacity style={styles.closeButton} onPress={()=>setCameraActive(false)}>
          <Close fill="#fff" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={CommonStyles.container}>
      <BackButton text="Required Authentication" left />
      <FlatList
        data={[ 1 ]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <View style={styles.gridContainer}>
              <TouchableOpacity
                style={[ styles.imageContainer, ]}
                onPress={() => handleCameraPress('selfie')}
              >
                <Text style={styles.label}>Face and T-shirt selfie*</Text>
                <Image source={selfieImage || Images.FaceTshirt} style={[ styles.image, !selfieImage && styles.missingImageBorder ]} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[ styles.imageContainer ]}
                onPress={() => handleCameraPress('front')}
              >
                <Text style={styles.label}>Front Side of Car/Bike*</Text>
                <Image source={frontImage || Images.FaceTshirt} style={[ styles.image, !frontImage && styles.missingImageBorder ]} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[ styles.imageContainer ]}
                onPress={() => handleCameraPress('right')}
              >
                <Text style={styles.label}>Right Side of Car/Bike*</Text>
                <Image source={rightImage || Images.FaceTshirt} style={[ styles.image, !rightImage && styles.missingImageBorder ]} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[ styles.imageContainer, ]}
                onPress={() => handleCameraPress('left')}
              >
                <Text style={styles.label}>Left Side of Car/Bike*</Text>
                <Image source={leftImage || Images.FaceTshirt} style={[ styles.image, !leftImage && styles.missingImageBorder ]} />
              </TouchableOpacity>
            </View>
          );
        }}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />

      <View style={[ CommonStyles.bottomView, { paddingHorizontal: 20 } ]}>
        <C_Button title="Upload" onPress={handleUpload} />
      </View>
    </View>
  );
};

export default RequiredAuthentication;

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: '45%',
    marginBottom: 20,
  },
  missingImageBorder: {
    borderWidth: 1,
    borderColor: 'red',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 8,
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
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.black,
  },
});

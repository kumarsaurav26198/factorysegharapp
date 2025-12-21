import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FontSize, FontsWeights } from '../../../themes/Fonts'
import Colors from '../../../themes/Colors'
import { CommonStyles } from '../../../themes/CommonStyles'
import { BackButton, CameraWithImage } from '../../../components'
import { Camera } from '../../../assets/icons'

const BecomeSeller = () => {
    const [capturedImages, setCapturedImages] = useState([]); // ⭐ Array of captured image paths|
    const [showCamera, setShowCamera] = useState(false);
    const handleCameraClose = () => {
        console.log('📸 [Camera] User closed camera without capture');
        setShowCamera(false);
    };
      const handleImageCapture = async (imagePath) => {
    console.log('📸 [Camera] handleImageCapture called with:', imagePath);
    console.log('📸 [Camera] Type:', typeof imagePath, '| Is Array:', Array.isArray(imagePath));
    
    // ✅ Handle both single string and array of strings
    let imagePathsArray = [];
    
    if (Array.isArray(imagePath)) {
      console.log('📦 [Camera] Received array with', imagePath.length, 'images');
      imagePathsArray = imagePath.filter(path => path && path !== '');
    } else if (typeof imagePath === 'string' && imagePath !== '') {
      console.log('📦 [Camera] Received single image path');
      imagePathsArray = [imagePath];
    } else {
      console.error('❌ [Camera] Invalid image path received:', imagePath);
      Alert.alert('Error', 'Failed to capture image. Please try again.');
      setShowCamera(false);
      return;
    }

    // Filter out invalid paths
    const validPaths = imagePathsArray.filter(path => 
      path && 
      typeof path === 'string' && 
      path.trim() !== '' && 
      path !== 'undefined' && 
      path !== 'null'
    );

    if (validPaths.length === 0) {
      console.error('❌ [Camera] No valid image paths found');
      Alert.alert('Error', 'Failed to capture image. Please try again.');
      setShowCamera(false);
      return;
    }

    console.log('✅ [Camera] Valid paths to add:', validPaths.length);

    // Check if adding these would exceed max
    const totalAfterAdd = capturedImages.length + validPaths.length;
    if (totalAfterAdd > MAX_IMAGES) {
      const canAdd = MAX_IMAGES - capturedImages.length;
      console.warn(`⚠️ [Camera] Can only add ${canAdd} more images`);
      
      if (canAdd > 0) {
        // Add only what we can
        const pathsToAdd = validPaths.slice(0, canAdd);
        setCapturedImages(prev => {
          const updated = [...prev, ...pathsToAdd];
          console.log('📷 [Images] Total images now:', updated.length);
          return updated;
        });
        
    
      } 
    } else {
      // Add all valid paths
      setCapturedImages(prev => {
        const updated = [...prev, ...validPaths];
        console.log('📷 [Images] Total images now:', updated.length);
        return updated;
      });
   
    }
    
    setShowCamera(false);
  };

    const MAX_IMAGES = 5;

    const handleOpenCamera = () => {


        setShowCamera(true);
    };

    return (
        <View style={[CommonStyles.container,]}>
            <BackButton left text={' Become Seller'} />
            <View style={styles.contentContainer}>
                <Text style={styles.label}>
                    Attach Images ({capturedImages.length}/{MAX_IMAGES})
                </Text>
                <TouchableOpacity
                    style={[
                        styles.imageBox,
                        capturedImages.length >= MAX_IMAGES && styles.imageBoxDisabled
                    ]}
                    onPress={handleOpenCamera}
                    disabled={capturedImages.length >= MAX_IMAGES}
                    activeOpacity={0.7}
                >
                    <Camera size={400} />
                    {/* <Icon 
                  name="camera-alt" 
                  size={40} 
                  color={capturedImages.length >= MAX_IMAGES ? Colors.GRAY : Colors.BTN_DFCCIL} 
                /> */}
                    <Text style={[
                        styles.uploadText,
                        capturedImages.length >= MAX_IMAGES && styles.disabledText
                    ]}>
                        {capturedImages.length >= MAX_IMAGES
                            ? "Maximum images reached"
                            : "+ Capture Image"}
                    </Text>
                    <Text style={styles.subText}>
                        {capturedImages.length === 0
                            ? "(Optional - You can capture up to 5 images)"
                            : `(Captured: ${capturedImages.length}/${MAX_IMAGES})`}
                    </Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={showCamera}
                animationType="slide"
                onRequestClose={handleCameraClose}
                presentationStyle="fullScreen"
            >
                <CameraWithImage
          onCapture={handleImageCapture}
          onClose={handleCameraClose}
        />
            </Modal>
        </View>
    )
}

export default BecomeSeller

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    label: {
        fontSize: 16,
        color: Colors.HEADING_COLOR_1,
        fontWeight: "600",
        marginTop: 14,
        marginBottom: 6,
    },
    imageBox: {
        width: "100%",
        height: 120,
        borderWidth: 2,
        borderColor: Colors.primary,
        borderStyle: "dashed",
        borderRadius: 12,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 18,
        paddingHorizontal: 10,
    },

    imageBoxDisabled: {
        borderColor: Colors.gray,
        backgroundColor: Colors.lightgrey,
    },
    policyText: {
        fontSize: FontSize.FS15,
        color: Colors.black,
        lineHeight: 24,
        textAlign: 'left',
    },
    headingText: {
        fontSize: FontSize.FS18,
        fontWeight: FontsWeights.FW600,
        color: Colors.black,
        marginBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        fontSize: FontSize.FS14,
        color: Colors.red,
        marginBottom: 20,
        textAlign: 'center',
    },
    refreshButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.primary,
        borderRadius: 6,
    },
    refreshButtonText: {
        fontSize: FontSize.FS14,
        color: Colors.white,
    },
});

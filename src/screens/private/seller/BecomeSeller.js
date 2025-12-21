import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import { CommonStyles } from '../../../themes/CommonStyles';
import Colors from '../../../themes/Colors';
import { BackButton, CameraWithImage, C_Button } from '../../../components';
import { Camera } from '../../../assets/icons';

const MAX_IMAGES = 5;

const DOC_TYPES = {
  AADHAAR: 'AADHAAR',
  KITCHEN: 'KITCHEN',
  OTHER: 'OTHER',
};

const BecomeSeller = ({ kycData, authToken }) => {
  const [activeDoc, setActiveDoc] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const [documents, setDocuments] = useState({
    AADHAAR: [],
    KITCHEN: [],
    OTHER: [],
  });


  const openCamera = (docType) => {
    setActiveDoc(docType);
    setShowCamera(true);
  };

  const closeCamera = () => {
    setShowCamera(false);
    setActiveDoc(null);
  };

  /* -------------------------
   * Upload helpers
   * ------------------------- */
  const getUploadUrl = async (fileName, contentType) => {
    const res = await axios.post(
      'https://dev.aryatkart.com/api/seller/kyc/upload-url',
      { fileName, contentType },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data; // { uploadUrl, fileUrl }
  };

  const uploadToS3 = async (uploadUrl, filePath, contentType) => {
    const fileBlob = await fetch(filePath).then(r => r.blob());

    await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
      },
      body: fileBlob,
    });
  };


  const handleImageCapture = async (path) => {
    try {
      const paths = Array.isArray(path) ? path : [path];

      for (const filePath of paths) {
        const fileName = filePath.split('/').pop();
        const contentType = 'image/jpeg';

        // 1️⃣ Get presigned URL
        const { uploadUrl, fileUrl } =
          await getUploadUrl(fileName, contentType);

        // 2️⃣ Upload to S3
        await uploadToS3(uploadUrl, filePath, contentType);

        // 3️⃣ Save uploaded file
        setDocuments(prev => ({
          ...prev,
          [activeDoc]: [...prev[activeDoc], fileUrl],
        }));
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Upload Failed', 'Please try again');
    } finally {
      closeCamera();
    }
  };

  const renderUploadBox = (label, docType) => {
    const count = documents[docType].length;

    return (
      <View style={styles.section}>
        <Text style={styles.label}>
          {label} ({count}/{MAX_IMAGES})
        </Text>

        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => openCamera(docType)}
          disabled={count >= MAX_IMAGES}
        >
          <Camera />
          <Text style={styles.uploadText}>
            {count >= MAX_IMAGES
              ? 'Maximum images reached'
              : '+ Capture Image'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={CommonStyles.container}>
      <BackButton text="Complete KYC"  left/>

      {renderUploadBox('Aadhaar Document', DOC_TYPES.AADHAAR)}
      {renderUploadBox('Kitchen Image', DOC_TYPES.KITCHEN)}
      {renderUploadBox('Other Document', DOC_TYPES.OTHER)}

      <View style={{ padding: 20 }}>
        <C_Button
          title="Submit KYC"
          onPress={() => Alert.alert('KYC Submitted')}
        />
      </View>

      <Modal visible={showCamera} animationType="slide">
        <CameraWithImage
          onCapture={handleImageCapture}
          onClose={closeCamera}
        />
      </Modal>
    </View>
  );
};

/* -------------------------
 * Redux
 * ------------------------- */
const mapStateToProps = (state) => ({
  kycData: state?.registerSellerReducers,
  authToken: state?.auth?.accessToken, // 🔑 IMPORTANT
});

export default connect(mapStateToProps)(BecomeSeller);

/* -------------------------
 * Styles
 * ------------------------- */
const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 6,
  },
  uploadBox: {
    height: 120,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  uploadText: {
    marginTop: 8,
    color: Colors.primary,
    fontWeight: '500',
  },
});

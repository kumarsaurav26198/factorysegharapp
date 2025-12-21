import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Image,
    Modal,
    ScrollView,
    Linking
} from "react-native";
import React, { useCallback, useRef, useState, useEffect } from "react";
import {
    Camera,
    useCameraDevice,
    useCameraPermission
} from "react-native-vision-camera";
import { Close, DoneIcon, Camera as CameraIcon, FlashOnIcon, FlashOffIcon, DeleteIcon } from "../../assets/icons";
import Colors from "../../themes/Colors";
import ImageViewer from "react-native-image-zoom-viewer";



const MAX_PHOTOS = 5;

const CameraWithImage = ({ onCapture, onClose }) => {
    const camera = useRef(null);

    const [cameraType, setCameraType] = useState("front");
    const [flash, setFlash] = useState('off');

    const device = useCameraDevice(cameraType);
    const { hasPermission, requestPermission } = useCameraPermission();

    const [isInitialized, setIsInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [capturedPhotos, setCapturedPhotos] = useState([]);
    const [previewIndex, setPreviewIndex] = useState(null);

    useEffect(() => {
        requestPermission();
    }, []);

    const switchCamera = () => {
        setCameraType((prev) => (prev === "back" ? "front" : "back"));
    };

    const takePhoto = useCallback(async () => {
        if (!camera.current || !isInitialized || isLoading) return;

        if (capturedPhotos.length >= MAX_PHOTOS) {
            Alert.alert(`Maximum ${MAX_PHOTOS} photos allowed`);
            return;
        }

        setIsLoading(true);

        try {
            const photo = await camera.current.takePhoto({ flash: "off" });
            const uri = `file://${photo.path}`;

            setCapturedPhotos((prev) => [...prev, uri]);
        } catch (err) {
            Alert.alert("Error", "Failed to capture image");
        } finally {
            setIsLoading(false);
        }
    }, [isInitialized, isLoading, capturedPhotos]);

    // Delete photo when inside viewer
    const deletePhoto = (index: number) => {
        const updated = capturedPhotos.filter((_, i) => i !== index);
        setCapturedPhotos(updated);
        setPreviewIndex(null);
    };

    // DONE → Return images
    const onDonePress = () => {
        if (capturedPhotos.length === 0) {
            Alert.alert("No Photos", "Please capture at least one image.");
            return;
        }
        onCapture(capturedPhotos);
        console.log("capturedPhotoscapturedPhotos", JSON.stringify(capturedPhotos, null, 2))
        // onClose();
    };
    const onFlashPress = () => {
        setFlash(prev => (prev === 'off' ? 'on' : 'off'))
    };

    // If no permission
    if (!hasPermission) {
        return (
            <View style={styles.center}>
                <Text style={styles.messageText}>Camera permission is required</Text>
                <TouchableOpacity onPress={() => Linking.openSettings()}>
                    <Text style={styles.buttonText}>Open Settings</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!device) {
        return (
            <View style={styles.center}>
                <Text style={styles.messageText}>Loading camera...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Close size={40}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flashButton} onPress={onFlashPress}>
                {
              flash === 'off' ?
              <FlashOffIcon size={18} color="red"/>
              :
              <FlashOnIcon/>
            }
            </TouchableOpacity>

            <TouchableOpacity style={styles.doneButton} onPress={onDonePress}>
                <DoneIcon/>
            </TouchableOpacity>
            <Camera
                ref={camera}
                flash={flash}

                style={styles.camera}
                device={device}
                isActive
                photo
                onInitialized={() => setIsInitialized(true)}
            />

            {capturedPhotos.length > 0 && (
                <View style={styles.thumbnailRow}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {capturedPhotos.map((img, index) => (
                            <TouchableOpacity key={index} onPress={() => setPreviewIndex(index)}>
                                <Image source={{ uri: img }} style={styles.thumbnail} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.captureButton,
                        (!isInitialized || isLoading) && styles.disabled
                    ]}
                    onPress={takePhoto}
                >
                    <View style={styles.captureInner} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.switchButton}
                    onPress={switchCamera}
                    disabled={isLoading}
                >
                    <CameraIcon/>
                </TouchableOpacity>
            </View>

            {previewIndex !== null && (
                <Modal visible transparent>
                    <View style={{ flex: 1, backgroundColor: "black" }}>
                        <ImageViewer
              imageUrls={capturedPhotos.map((u) => ({ url: u }))}
              index={previewIndex}
              onSwipeDown={() => setPreviewIndex(null)}
              enableSwipeDown
            />

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deletePhoto(previewIndex)}
                        >
                            <DeleteIcon/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.closePreviewButton}
                            onPress={() => setPreviewIndex(null)}
                        >
                            <Close/>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default CameraWithImage;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "black" },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    camera: { flex: 1 },
    messageText: { color: "white", fontSize: 16 },
    buttonText: { color: "cyan", fontSize: 18, marginTop: 10 },


    closeButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
        backgroundColor:Colors.white,

        borderRadius: 20,
        padding: 10,
    },

    doneButton: {
        position: "absolute",
        top: 40,
        right: 20,
        zIndex: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 5,
    },
    flashButton: {
        position: "absolute",
        top: 40,
        zIndex: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 5,
        alignSelf: 'center',
    },

    buttonContainer: {
        position: "absolute",
        bottom: 40,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "rgba(255,255,255,0.3)",
        justifyContent: "center",
        alignItems: "center"
    },

    captureInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "white"
    },

    switchButton: {
        position: "absolute",
        right: 25,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor:Colors.white,
        justifyContent: "center",
        alignItems: "center"
    },

    disabled: { opacity: 0.5 },

    thumbnailRow: {
        position: "absolute",
        bottom: 140,
        paddingLeft: 10,
        height: 80
    },

    thumbnail: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "white"
    },

    deleteButton: {
        position: "absolute",
        bottom: 40,
        left: 30,
        backgroundColor: "rgba(255,0,0,0.6)",
        padding: 12,
        borderRadius: 40
    },

    closePreviewButton: {
        position: "absolute",
        top: 30,
        right: 10,
        backgroundColor:Colors.white,
        padding: 10,
        borderRadius: 40
    }
});

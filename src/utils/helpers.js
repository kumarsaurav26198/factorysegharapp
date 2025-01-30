// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import { Alert, Platform } from 'react-native';

// export const requestCameraPermission = async () => {
//   try {
//     const result = await request(
//       Platform.OS === 'ios'
//         ? PERMISSIONS.IOS.CAMERA
//         : PERMISSIONS.ANDROID.CAMERA
//     );
//     return handlePermissionResult(result);
//   } catch (error) {
//     console.warn('Permission error:', error);
//     return 'error';
//   }
// };
// export const requestContactPermission = async () => {
//   try {
//     const result = await request(
//       Platform.OS === 'ios'
//         ? PERMISSIONS.IOS.CONTACTS
//         : PERMISSIONS.ANDROID.READ_CONTACTS
//     );
//     return handlePermissionResult(result, 'contacts');
//   } catch (error) {
//     console.warn('Contact Permission error:', error);
//     return 'error';
//   }
// };
// const handlePermissionResult = (result) => {
//   switch (result) {
//     case RESULTS.UNAVAILABLE:
//       Alert.alert('Camera not available on this device.');
//       return 'unavailable';
//     case RESULTS.DENIED:
//       Alert.alert('Camera permission denied. Please allow it in settings.');
//       return 'denied';
//     case RESULTS.GRANTED:
//       return 'granted';
//     case RESULTS.BLOCKED:
//       Alert.alert('Camera permission blocked. Please enable it in settings.');
//       return 'blocked';
//     default:
//       return 'unknown';
//   }
// };

export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} min`;
  };
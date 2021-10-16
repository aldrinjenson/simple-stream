import { PermissionsAndroid } from 'react-native';

export const requestFileAccessPermission = async () => {
  try {
    let granted = null;
    granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Grant File Read Permission',
        message: 'You need to give File Read permission to download songs',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('File read permission received');
    } else {
      console.log('File read permission denied');
    }
    granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Gran File Write Permission',
        message: 'You need to give File Write permission to download songs',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('File write permission received');
    } else {
      console.log('File write permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

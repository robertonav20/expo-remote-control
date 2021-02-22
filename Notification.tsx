import {Platform, ToastAndroid} from 'react-native';

export const showToast = (message: string) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
    } else if (Platform.OS === 'web') {
    } else if (Platform.OS === 'windows') {
    }
}
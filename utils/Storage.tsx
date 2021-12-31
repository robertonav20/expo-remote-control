import AsyncStorage from "@react-native-async-storage/async-storage";
import {showToast} from "./Notification";

export const storeData = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        showToast(e);
    }
}

export const getData = (key: string): Promise<any> => {
    try {
        return AsyncStorage.getItem(key);
    } catch (e) {
        showToast(e);
        return Promise.reject('Error during read configuration');
    }
}

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear()
        showToast('Storage successfully cleared!')
    } catch (e) {
        showToast('Failed to clear the async storage.')
    }
}
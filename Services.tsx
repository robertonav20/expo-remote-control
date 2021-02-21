import Axios, {AxiosInstance} from 'axios';
import {showToast} from "./Notification";
import {BASE_PATH, PROTOCOLS, TIMEOUT} from "./Variables";
import AsyncStorage from '@react-native-async-storage/async-storage';

export let axios: AxiosInstance = Axios.create({
    baseURL: BASE_PATH,
    timeout: TIMEOUT,
    headers: {
        Accept: '*/*',
    }
});

export const _refreshBasePath = (protocol: boolean, hostname: string, port: number, timeout: number) => {
    axios = Axios.create({
        baseURL: protocol ? PROTOCOLS[1] : PROTOCOLS[0] + '://' + hostname + ':' + port + '/',
        timeout: timeout,
        headers: {
            Accept: '*/*',
        }
    });
}

export const _activeMute = () => {
    axios.put('volume/controller/muteOn')
        .then((response: any) => {
            showToast(response.data.message);
        })
        .catch((error: any) => {
            showToast(error.message + " " + error.code);
        });
}

export const _disableMute = () => {
    axios.put('volume/controller/muteOff')
        .then((response: any) => {
            showToast(response.data.message);
        })
        .catch((error: any) => {
            showToast(error.message + " " + error.code);
        });
}

export const _setVolume = (volume: number) => {
    axios.put('volume/controller/changeVolume',
        {
            volume: volume
        })
        .then((response: any) => {
            showToast(response.data.message);
        })
        .catch((error: any) => {
            showToast(error.message + " " + error.code);
        });
}

export const _getVolume = (): Promise<any> => {
    return axios.get('volume/controller/getVolume')
        .then((response: any) => {
            return Promise.resolve(response.data.volume);
        })
        .catch((error: any) => {
            showToast(error.message + ' ' + error.code);
            return Promise.reject();
        });
}

export const _moveCallback = (x: number, y: number, pressure: number) => {
    return axios.post('mouse/controller',{
            xCoordinate: x,
            yCoordinate: y,
            pressure
        })
        .then((response: any) => {
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            showToast(error.message + ' ' + error.code);
            return Promise.reject();
        });
}

export const _leftClick = () => {
    return axios.post('mouse/controller',{
            leftClick: true
        })
        .then((response: any) => {
            return Promise.resolve(response.data.volume);
        })
        .catch((error: any) => {
            showToast(error.message + ' ' + error.code);
            return Promise.reject();
        });
}

export const _rightClick = () => {
    return axios.post('mouse/controller',{
            rightClick: true
        })
        .then((response: any) => {
            return Promise.resolve(response.data.volume);
        })
        .catch((error: any) => {
            showToast(error.message + ' ' + error.code);
            return Promise.reject();
        });
}

export const _keyboardInputTrigger = (keyEvents: string[]) : Promise<string> => {
    return axios.post('keyboard/controller',{
            keyEvents: keyEvents
        })
        .then((response: any) => {
            return Promise.resolve(response.data.message);
        })
        .catch((error: any) => {
            showToast(error.message + ' ' + error.message);
            return Promise.reject();
        });
}

export const _getMouseLocation = () : Promise<any> => {
    return axios.get('mouse/controller/location')
        .then((response: any) => {
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            showToast(error.code + ' ' + error.message);
            return Promise.reject();
        });
}

export const storeData = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        showToast(e);
    }
}

export const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        } else return null
    } catch(e) {
        showToast(e);
        return null;
    }
}
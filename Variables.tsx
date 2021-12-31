import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from './utils/Notification';
import Axios, {AxiosInstance} from 'axios';

export let SERVER_CONFIGURATION_KEY: string = 'SERVER_CONFIGURATION_KEY';
export let HOSTNAME: string = 'localhost';
export let PROTOCOLS: string[] = ['HTTP', 'HTTPS'];
export let PROTOCOL: boolean = false;
export let PORT: number = 8080;
export let BASE_PATH: string = (PROTOCOL ? PROTOCOLS[1] : PROTOCOLS[0]) + '://' + HOSTNAME + ':' + PORT + '/';
export const TIMEOUT: number = 3000;
export let AXIOS: AxiosInstance = Axios.create({
    baseURL: BASE_PATH,
    timeout: TIMEOUT,
    headers: {
        Accept: '*/*',
    }
});

export interface ServerConfiguration {
    protocol: boolean,
    hostname: string,
    port: number
}

export const loadVariables = async () => {
    await loadServerConfiguration();
}

export const loadServerConfiguration = () => {
    getServerConfiguration()
        .then(configuration => {
            showToast('Loading Configuration');
            if (configuration) {
                PROTOCOL = Boolean(configuration.protocol);
                HOSTNAME = String(configuration.hostname);
                PORT = Number(configuration.port);
                updateServerConfiguration(configuration.protocol, configuration.hostname, configuration.port, TIMEOUT);
            } else {
                updateServerConfiguration(PROTOCOL, HOSTNAME, PORT, TIMEOUT);
            }

        })
        .catch(() => updateServerConfiguration(PROTOCOL, HOSTNAME, PORT, TIMEOUT));
}

export const getAxios = () => {
    return AXIOS;
}

export const refreshBasePath = (protocol: boolean, hostname: string, port: number, timeout: number) => {
    AXIOS = Axios.create({
        baseURL: protocol ? PROTOCOLS[1] : PROTOCOLS[0] + '://' + hostname + ':' + port + '/',
        timeout: timeout,
        headers: {
            Accept: '*/*',
        }
    });

    BASE_PATH = (protocol ? PROTOCOLS[1] : PROTOCOLS[0]) + '://' + hostname + ':' + port + '/';
}

export const getServerConfiguration = (): Promise<any> => {
    return getData(SERVER_CONFIGURATION_KEY)
        .then(configuration => {
            if (configuration !== null && configuration !== undefined && configuration !== '') return JSON.parse(configuration);
        })
        .catch(() => {
            return {PROTOCOL, HOSTNAME, PORT, TIMEOUT}
        });
}

export const updateServerConfiguration = async (protocol: boolean, hostname: string, port: number, timeout: number) => {
    try {
        if (!hostname && !port && !timeout && protocol !== true && protocol !== false) {
            throw new Error('You can\'t save this configuration! Wrong parameters')
        }

        await storeData(SERVER_CONFIGURATION_KEY, JSON.stringify({
            protocol,
            hostname,
            port,
            timeout
        }))
        PROTOCOL = Boolean(protocol);
        HOSTNAME = String(hostname);
        PORT = Number(port);
        refreshBasePath(protocol, hostname, port, timeout);
    } catch (e) {
        showToast(e);
    }
}

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

export const KEYBOARD_MAP_SPECIAL = {
    '@': ['VK_AT'],
    ',': ['VK_COMMA'],
    '+': ['VK_PLUS'],
    '-': ['VK_MINUS'],
    '*': ['VK_MULTIPLY'],
    '/': ['VK_SLASH'],
    '\\': ['VK_BACK_SLASH'],
    '.': ['VK_PERIOD'],
    ' ': ['VK_SPACE'],
    '€': ['VK_EURO_SIGN'],
    '$': ['VK_DOLLAR'],
    '!': ['VK_EXCLAMATION_MARK'],
    '(': ['VK_LEFT_PARENTHESIS'],
    ')': ['VK_RIGHT_PARENTHESIS'],
    '_': ['VK_UNDERSCORE'],
    '#': ['VK_NUMBER_SIGN'],
    ';': ['VK_SEMICOLON'],
    ':': ['VK_COLON'],
    '=': ['VK_EQUALS'],
    '^': ['VK_CIRCUMFLEX'],
    'CapsLock': ['VK_CAPS_LOCK'],
    'Shift': ['VK_SHIFT'],
    'Backspace': ['VK_BACK_SPACE'],
    'Delete': ['VK_DELETE'],
    'Escape': ['VK_ESCAPE'],
    'Enter': ['VK_ENTER'],
    'ClearAll': ['VK_CONTROL', 'VK_A', 'VK_BACK_SPACE'],
    'A': ['VK_SHIFT','VK_A'],
    'B': ['VK_SHIFT','VK_B'],
    'C': ['VK_SHIFT','VK_C'],
    'D': ['VK_SHIFT','VK_D'],
    'E': ['VK_SHIFT','VK_E'],
    'F': ['VK_SHIFT','VK_F'],
    'G': ['VK_SHIFT','VK_G'],
    'H': ['VK_SHIFT','VK_H'],
    'I': ['VK_SHIFT','VK_I'],
    'J': ['VK_SHIFT','VK_J'],
    'K': ['VK_SHIFT','VK_K'],
    'L': ['VK_SHIFT','VK_L'],
    'M': ['VK_SHIFT','VK_M'],
    'N': ['VK_SHIFT','VK_N'],
    'O': ['VK_SHIFT','VK_O'],
    'P': ['VK_SHIFT','VK_P'],
    'Q': ['VK_SHIFT','VK_Q'],
    'R': ['VK_SHIFT','VK_R'],
    'S': ['VK_SHIFT','VK_S'],
    'T': ['VK_SHIFT','VK_T'],
    'U': ['VK_SHIFT','VK_U'],
    'V': ['VK_SHIFT','VK_V'],
    'W': ['VK_SHIFT','VK_W'],
    'X': ['VK_SHIFT','VK_X'],
    'Y': ['VK_SHIFT','VK_Y'],
    'Z': ['VK_SHIFT','VK_Z'],
    'a' : ['VK_A'],
    'b' : ['VK_B'],
    'c' : ['VK_C'],
    'd' : ['VK_D'],
    'e' : ['VK_E'],
    'f' : ['VK_F'],
    'g' : ['VK_G'],
    'h' : ['VK_H'],
    'i' : ['VK_I'],
    'j' : ['VK_J'],
    'k' : ['VK_K'],
    'l' : ['VK_L'],
    'm' : ['VK_M'],
    'n' : ['VK_N'],
    'o' : ['VK_O'],
    'p' : ['VK_P'],
    'q' : ['VK_Q'],
    'r' : ['VK_R'],
    's' : ['VK_S'],
    't' : ['VK_T'],
    'u' : ['VK_U'],
    'v' : ['VK_V'],
    'w' : ['VK_W'],
    'x' : ['VK_X'],
    'y' : ['VK_Y'],
    'z' : ['VK_Z'],
    '0' : ['VK_0'],
    '1' : ['VK_1'],
    '2' : ['VK_2'],
    '3' : ['VK_3'],
    '4' : ['VK_4'],
    '5' : ['VK_5'],
    '6' : ['VK_6'],
    '7' : ['VK_7'],
    '8' : ['VK_8'],
    '9' : ['VK_9']
}
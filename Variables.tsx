import AsyncStorage from "@react-native-async-storage/async-storage";
import {showToast} from "./Notification";
import Axios, {AxiosInstance} from "axios";

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

export const getData = async (key: string): Promise<any> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        } else return null
    } catch (e) {
        showToast(e);
        return null;
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
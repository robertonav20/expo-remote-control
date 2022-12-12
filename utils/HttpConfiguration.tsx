import {showToast} from './Notification';
import Axios, {AxiosInstance} from 'axios';
import {ServerConfiguration, ServerHttpEvent} from "./Interfaces";
import {getData, storeData} from "./Storage";

export let SERVER_CONFIGURATION_KEY: string = 'SERVER_CONFIGURATION_KEY';
export let HOSTNAME: string = 'localhost';
export let PROTOCOLS: string[] = ['HTTP', 'HTTPS'];
export let PROTOCOL: boolean = false;
export let PORT: number = 8080;
export let BASE_PATH: string = (PROTOCOL ? PROTOCOLS[1] : PROTOCOLS[0]) + '://' + HOSTNAME + ':' + PORT + '/';
export const TIMEOUT: number = 3000;
export let HTTP_EVENTS: ServerHttpEvent[] = [];
export let AXIOS: AxiosInstance;

export const getAxios = (): AxiosInstance => {
    return AXIOS;
}

export const getHttpEvents = () => {
    return HTTP_EVENTS;
}

export const removeHttpEvent = (httpEvent: ServerHttpEvent) => {
    if (HTTP_EVENTS.length > 2) {
        HTTP_EVENTS = HTTP_EVENTS.filter(e => e.id !== httpEvent.id);
    } else {
        HTTP_EVENTS.pop();
    }
}

export const loadHttpConfiguration = async () => {
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

export const getServerConfiguration = (): Promise<ServerConfiguration> => {
    return getData(SERVER_CONFIGURATION_KEY)
        .then(configuration => {
            if (configuration !== null && configuration !== undefined && configuration !== '') {
                return JSON.parse(configuration);
            }
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

export const refreshBasePath = (protocol: boolean, hostname: string, port: number, timeout: number) => {
    BASE_PATH = (protocol ? PROTOCOLS[1] : PROTOCOLS[0]) + '://' + hostname + ':' + port + '/';
    AXIOS = Axios.create({
        baseURL: BASE_PATH,
        timeout: timeout,
        headers: {
            Accept: '*/*',
        }
    });

    AXIOS.interceptors.response.use(
        (response) => {
            console.log(response)
            let name = '';
            if (response.config.url) {
                const paths = response.config.url.split('/')
                name = paths[paths.length - 1].charAt(0).toUpperCase() + paths[paths.length - 1].slice(1);
            }
            HTTP_EVENTS.push({
                id: String(Math.round(Math.random() * 100000000)),
                name,
                path: response.config.url,
                status: response.status,
                requestBody: JSON.stringify(response.config.data),
                responseBody: JSON.stringify(response.data),
                errorMessage: response.message,
                date: new Date()
            })
            return response;
        },
        (response) => {
            console.log(response)
            let name = '';
            if (response.config.url) {
                const paths = response.config.url.split('/')
                name = paths[paths.length - 1].charAt(0).toUpperCase() + paths[paths.length - 1].slice(1);
            }
            HTTP_EVENTS.push({
                id: String(Math.round(Math.random() * 100000000)),
                name,
                path: response.config.url,
                status: response.status,
                requestBody: JSON.stringify(response.config.data),
                responseBody: JSON.stringify(response.data),
                errorMessage: response.message,
                date: new Date()
            })
            return Promise.reject(response);
        }
    )
}
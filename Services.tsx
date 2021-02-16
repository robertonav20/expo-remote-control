import Axios, {AxiosInstance} from 'axios';
import {showToast} from "./Notification";

export const HOSTNAME: string = 'localhost';
//export const HOSTNAME: string = 'DESKTOP-FIBGVH5.home-life.hub';
export const PROTOCOLS: string[] = ['HTTP', 'HTTPS'];
export const PROTOCOL: boolean = false;
export const PORT: number = 8080;

export const BASE_PATH: string = (PROTOCOL ? PROTOCOLS[1] : PROTOCOLS[0]) + '://' + HOSTNAME + ':' + PORT + '/';
export const TIMEOUT: number = 3000;

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
            return Promise.resolve(response.data.volume);
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
    console.log('asdasdasd')
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
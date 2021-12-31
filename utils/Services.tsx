import {showToast} from './Notification';
import {AXIOS, getAxios} from '../Variables';

let axios = AXIOS;

export const _getLastAxios = () => {
    axios = getAxios();
}

export const _activeMute = () => {
    _getLastAxios();

    axios.put('volume/controller/muteOn')
        .then((response: any) => {
            showToast(response.data.message);
        })
        .catch((error: any) => {
            showToast(error.message + ' ' + error.code);
        });
}

export const _disableMute = () => {
    _getLastAxios();

    axios.put('volume/controller/muteOff')
        .then((response: any) => {
            showToast(response.data.message);
        })
        .catch((error: any) => {
            showToast(error.message + ' ' + error.code);
        });
}

export const _setVolume = (volume: number) => {
    _getLastAxios();

    axios.put('volume/controller/changeVolume',
        {
            volume: volume
        })
        .then((response: any) => {
            showToast(response.data.message);
        })
        .catch((error: any) => {
            showToast(error.message + ' ' + error.code);
        });
}

export const _getVolume = (): Promise<any> => {
    _getLastAxios();

    return axios.get('volume/controller/getVolume')
        .then((response: any) => {
            return Promise.resolve(response.data.volume);
        })
        .catch((error: any) => {
            showToast('Error during getVolume : ' + error.message + ' ' + error.code);
            return Promise.reject();
        });
}

export const _moveCallback = (x: number, y: number, pressure: number) => {
    _getLastAxios();

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
    _getLastAxios();

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
    _getLastAxios();

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
    _getLastAxios();

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
    _getLastAxios();

    return axios.get('mouse/controller/location')
        .then((response: any) => {
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            showToast(error.code + ' ' + error.message);
            return Promise.reject();
        });
}
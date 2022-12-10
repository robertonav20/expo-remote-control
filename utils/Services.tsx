import {showToast} from './Notification';
import {getAxios} from './HttpConfiguration';

export const _activeMute = () => {
    const axios = getAxios();
    if (axios == null) {
        return Promise.reject()
    }

    axios.put('volume/controller/muteOn')
        .then((response: any) => {
            showToast(response.data.message);
        })
        .catch((error: any) => {
            showToast(error.message + ' ' + error.code);
        });
}

export const _disableMute = () => {
    const axios = getAxios();
    if (axios == null) {
        return Promise.reject()
    }

    axios.put('volume/controller/muteOff')
        .then((response: any) => {
            showToast(response.data.message);
        })
        .catch((error: any) => {
            showToast(error.message + ' ' + error.code);
        });
}

export const _setVolume = (volume: number) => {
    const axios = getAxios();
    if (axios == null) {
        return Promise.reject()
    }

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
    const axios = getAxios();
    if (axios == null) {
        return Promise.reject()
    }

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
    const axios = getAxios();
    if (axios == null) {
        return Promise.reject()
    }

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
    const axios = getAxios();
    if (axios == null) {
        return Promise.reject()
    }

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
    const axios = getAxios();
    if (axios == null) {
        return Promise.reject()
    }

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
    const axios = getAxios();
    if (axios == null) {
        return Promise.reject()
    }

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
    const axios = getAxios();

    if (axios == null) {
        return Promise.reject()
    }

    return axios.get('mouse/controller/location')
        .then((response: any) => {
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            showToast(error.code + ' ' + error.message);
            return Promise.reject();
        });
}
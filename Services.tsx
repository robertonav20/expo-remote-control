import {showToast} from "./Notification";
import {AXIOS} from "./Variables";

export const _activeMute = () => {
    AXIOS.put('volume/controller/muteOn')
        .then((response: any) => {
            showToast(response.data.message);
        })
        .catch((error: any) => {
            showToast(error.message + " " + error.code);
        });
}

export const _disableMute = () => {
    AXIOS.put('volume/controller/muteOff')
        .then((response: any) => {
            showToast(response.data.message);
        })
        .catch((error: any) => {
            showToast(error.message + " " + error.code);
        });
}

export const _setVolume = (volume: number) => {
    AXIOS.put('volume/controller/changeVolume',
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
    return AXIOS.get('volume/controller/getVolume')
        .then((response: any) => {
            return Promise.resolve(response.data.volume);
        })
        .catch((error: any) => {
            showToast('Error during getVolume : ' + error.message + ' ' + error.code);
            return Promise.reject();
        });
}

export const _moveCallback = (x: number, y: number, pressure: number) => {
    return AXIOS.post('mouse/controller',{
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
    return AXIOS.post('mouse/controller',{
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
    return AXIOS.post('mouse/controller',{
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
    return AXIOS.post('keyboard/controller',{
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
    return AXIOS.get('mouse/controller/location')
        .then((response: any) => {
            return Promise.resolve(response.data);
        })
        .catch((error: any) => {
            showToast(error.code + ' ' + error.message);
            return Promise.reject();
        });
}
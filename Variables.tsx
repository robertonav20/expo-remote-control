//export const HOSTNAME: string = 'localhost';
import {getData} from "./Services";

export let HOSTNAME: string = 'localhost';
//export const HOSTNAME: string = 'DESKTOP-FIBGVH5';
//export const HOSTNAME: string = 'MIL-JPL23Z2';
export let PROTOCOLS: string[] = ['HTTP', 'HTTPS'];
export let PROTOCOL: boolean = false;
export let PORT: number = 8080;
export let BASE_PATH: string = (PROTOCOL ? PROTOCOLS[1] : PROTOCOLS[0]) + '://' + HOSTNAME + ':' + PORT + '/';
export const TIMEOUT: number = 3000;

export const loadVariables = async () => {
    loadProtocol();
    loadHostname();
    loadPort();
}

export const loadProtocol = () => {
    getData('protocol')
        .then(value => {
            if (value) {
                PROTOCOL = Boolean(value);
            }
        });
}

export const loadHostname = () => {
    getData('hostname')
        .then(value => {
            if (value) {
                HOSTNAME = String(value);
            }
        });
}
export const loadPort = () => {
    getData('port')
        .then(value => {
            if (value) {
                PORT = Number(value);
            }
        });
}

export const refreshBasePath = () => {
    BASE_PATH = (PROTOCOL ? PROTOCOLS[1] : PROTOCOLS[0]) + '://' + HOSTNAME + ':' + PORT + '/';
}
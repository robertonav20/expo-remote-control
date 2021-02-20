//export const HOSTNAME: string = 'localhost';
export const HOSTNAME: string = 'DESKTOP-FIBGVH5';
//export const HOSTNAME: string = 'MIL-JPL23Z2';
export const PROTOCOLS: string[] = ['HTTP', 'HTTPS'];
export const PROTOCOL: boolean = false;
export const PORT: number = 8080;
export const BASE_PATH: string = (PROTOCOL ? PROTOCOLS[1] : PROTOCOLS[0]) + '://' + HOSTNAME + ':' + PORT + '/';
export const TIMEOUT: number = 3000;
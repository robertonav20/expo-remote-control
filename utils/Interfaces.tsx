export interface ServerConfiguration {
    protocol: boolean,
    hostname: string,
    port: number,
    timeout: number
}

export interface ServerHttpEvent {
    id: string
    name: string,
    path: string | undefined,
    status: number,
    requestBody: any,
    responseBody: any,
    errorMessage: any,
    date: Date
}
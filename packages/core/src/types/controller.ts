export enum Method {
    GET,
    POST,
    PUT,
    DELETE,
    PATCH
}

export enum Action {
    JSON,
    VIEW,
    SEND
}

export interface Route {
    path?: string,
    method?: Method,
    function: string,
    action?: Action,
    controller: string
}

export interface Controller {
    name: string,
    path?: string,
    routes?: Route[],
    file?: string
}

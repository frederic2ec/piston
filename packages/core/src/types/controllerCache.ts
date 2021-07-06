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

export interface RouteCache {
    path?: string,
    method?: Method,
    function: string,
    action?: Action,
    controller: string
}

export interface ControllerCache {
    name: string,
    path?: string,
    routes?: RouteCache[],
    file?: string
}

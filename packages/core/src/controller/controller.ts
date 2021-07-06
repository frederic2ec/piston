import cache from "../cache/controller"
import {Request, Response} from "express"

const Controller = (path?: string) => {
    return function<T extends { new(...args: any[]): {} }>(controller: T) {
        cache.addController({
            name: controller.name,
            path: path || controller.name.toLocaleLowerCase().replace('controller', ''),
        })
        return class extends controller {
            request: Request|null = null
            response: Response|null = null
        }
    }
}

export {Controller}
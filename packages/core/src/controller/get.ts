import cache from "../cache/controller"
import { Method } from "../cache/controller"

const Get = (path?: string) => {
    return function(controller: object, methodName: string, _: PropertyDescriptor) {
        cache.addRoute({
            path: path || methodName.toLocaleLowerCase(),
            controller: controller.constructor.name,
            function: methodName,
            method: Method.GET
        })
    }
}

export {Get}
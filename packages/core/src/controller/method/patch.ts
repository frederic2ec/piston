import cache from "../../cache/controller"
import { Method } from "../../types"

const Patch = (path?: string) => {
    return function(controller: object, methodName: string, _: PropertyDescriptor) {
        cache.setRouteMethod({
            path: path || methodName.toLocaleLowerCase(),
            controller: controller.constructor.name,
            function: methodName,
            method: Method.PATCH
        })
    }
}

export {Patch}
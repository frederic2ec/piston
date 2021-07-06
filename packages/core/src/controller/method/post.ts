import cache from "../../cache/controller"
import { Method } from "../../types"

const Post = (path?: string) => {
    return function(controller: object, methodName: string, _: PropertyDescriptor) {
        cache.setRouteMethod({
            path: path || methodName.toLocaleLowerCase(),
            controller: controller.constructor.name,
            function: methodName,
            method: Method.POST
        })
    }
}

export {Post}
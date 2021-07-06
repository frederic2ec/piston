import cache from "../../cache/controller"
import {Action} from "../../types"

const Json = () => {
    return function(controller: object, methodName: string, _: PropertyDescriptor) {
        cache.setRouteAction({
            path: methodName.toLocaleLowerCase(),
            controller: controller.constructor.name,
            function: methodName,
            action: Action.JSON
        })
    }
}

export {Json}
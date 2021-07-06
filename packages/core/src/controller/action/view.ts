import cache from "../../cache/controller"
import {Action} from "../../types"

const View = () => {
    return function(controller: object, methodName: string, _: PropertyDescriptor) {
        cache.setRouteAction({
            path: methodName.toLocaleLowerCase(),
            controller: controller.constructor.name,
            function: methodName,
            action: Action.VIEW
        })
    }
}

export {View}
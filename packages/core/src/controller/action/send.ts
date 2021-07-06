import cache from "../../cache/controller"
import {Action} from "../../types"

const Send = () => {
    return function(controller: object, methodName: string, _: PropertyDescriptor) {
        cache.setRouteAction({
            path: methodName.toLocaleLowerCase(),
            controller: controller.constructor.name,
            function: methodName,
            action: Action.SEND
        })
    }
}

export {Send}
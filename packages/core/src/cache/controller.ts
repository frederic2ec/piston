import * as glob from "glob";
import * as path from "path";
import {Controller, Route} from "../types"

class ControllerCache {
    #controllers: Controller[] = []

    private getController(name: string) {
        // @ts-ignore
        for (const [key, value] of Object.entries(this.#controllers)) {
            if(value.name === name) {
                return parseInt(key)
            }
        }
        return null
    }

    private getRoute(controllerName:string, routeName: string) {
        const index = this.getController(controllerName)
        if (index !== null) {
            // @ts-ignore
            for (const [key, value] of Object.entries(this.#controllers[index].routes)) {
                if(value.function === routeName) {
                    return parseInt(key)
                }
            }
        }
        return null
    }

    private createController(controller: Controller) {
        this.#controllers.push(controller)
    }

    public setControllerFile(controller: Controller) {
        const index = this.getController(controller.name)
        if (index !== null) {
            this.#controllers[index].file = controller.file
        } else {
            this.createController({
                name: controller.name,
                file: controller.file
            })
        }
    }

    public setRouteAction(route: Route) {
        const controllerIndex = this.getController(route.controller)
        const routeIndex = this.getRoute(route.controller, route.function)
        if(routeIndex !== null && controllerIndex !== null) {
            // @ts-ignore
            this.#controllers[controllerIndex].routes[routeIndex].action = route.action
        } else {
            this.addRoute(route)
        }
    }

    public setRouteMethod(route: Route) {
        const controllerIndex = this.getController(route.controller)
        const routeIndex = this.getRoute(route.controller, route.function)
        if(routeIndex !== null && controllerIndex !== null) {
            // @ts-ignore
            this.#controllers[controllerIndex].routes[routeIndex].method = route.method
            // @ts-ignore
            this.#controllers[controllerIndex].routes[routeIndex].path = route.path
        } else {
            this.addRoute(route)
        }
    }

    public addController(controller: Controller) {
        const index = this.getController(controller.name)
        if (index !== null) {
            this.#controllers[index].path = controller.path
        } else {
            this.createController({
                name: controller.name,
                path: controller.path
            })
        }
    }

    public addRoute(route: Route) {
        const index = this.getController(route.controller)
        if(index !== null) {
            this.#controllers[index].routes?.push(route)
        } else {
            this.createController({
                name: route.controller,
                routes: [route]
            })
        }
    }

    public getAllController() {
        return this.#controllers
    }

    public generateController(root: string) {
        const controllers = glob.sync(path.join(root, "controllers", "*.controller.*"))
        controllers.forEach(controller => {
            const classs = require(controller) as object

            Object.keys(classs).forEach(key => {
                // @ts-ignore
                new classs[key]()

                this.setControllerFile({
                    // @ts-ignore
                    name: classs[key].name,
                    file: controller
                })
            })
        })
    }
}

export default new ControllerCache()
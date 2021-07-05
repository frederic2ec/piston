export enum Method {
    GET,
    POST,
    PUT,
    DELETE
}

enum Action {
    JSON,
    VIEW,
    SEND
}

interface Route {
    path?: string,
    method: Method,
    function: string,
    action?: Action,
    controller: string
}

interface Controller {
    name: string,
    path?: string,
    routes?: Route[],
    file?: string
}

class ControllerCache {
    #controllers: Controller[] = []

    private getController(name: string) {
        for (const [key, value] of Object.entries(this.#controllers)) {
            if(value.name === name) {
                return parseInt(key)
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
        console.log(this.#controllers)
        return this.#controllers
    }
}

export default new ControllerCache()
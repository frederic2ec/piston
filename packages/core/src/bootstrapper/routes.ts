import {Request, Response, Router} from "express"
import cache from "../cache/controller";
import * as path from "path";
import {Action, Method} from "../types";

class Routes {
    #router: Router

    constructor() {
        this.#router = Router()
    }

    private getFunction(method: Method | undefined): string {
        switch(method) {
            case Method.DELETE:
                return "delete"
            case Method.GET:
                return "get"
            case Method.PATCH:
                return "patch"
            case Method.POST:
                return "post"
            case Method.PUT:
                return "put"
            default:
                return "get"
        }
    }

    public generateRoutes() {
        cache.getAllController().forEach(controller => {
            controller.routes?.forEach(route => {
                const routePath = path.join('/', <string>controller.path, <string>route.path)
                const functionName = this.getFunction(route.method)
                // @ts-ignore
                this.#router[functionName](routePath, (req: Request, res: Response) => {
                    const control = require(<string>controller.file)
                    const classs = new control[controller.name]()
                    classs.request = req
                    classs.response = res
                    switch(route.action) {
                        case Action.JSON:
                            return res.json(classs[route.function]())
                        case Action.SEND:
                            return res.send(classs[route.function]())
                        case Action.VIEW:
                            return res.render(path.join(<string>controller.name.toLocaleLowerCase().replace('controller', ''), <string>route.function.toLocaleLowerCase()), classs[route.function]())
                        default:
                            return classs[route.function]()
                    }
                })
            })
        })
    }

    public getRouter() {
        return this.#router
    }
}

export { Routes }
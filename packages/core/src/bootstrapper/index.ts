import * as express from "express";
import * as glob from "glob"
import * as path from "path"
import { Express } from "express"
import cache from "../cache/controller"
import {Method} from "../cache/controller"

interface BootstrapperConfig {
    port: number,
    host: string
}

class Bootstrapper {
    #app: Express = express()

    #port: number = parseInt(process.env.PORT || "8080")
    #host: string = process.env.HOST || "0.0.0.0"

    #root: string = process.cwd()

    constructor(config?: BootstrapperConfig) {
        if (config?.port && !process.env.PORT) {
            this.#port = config.port
        }
        if (config?.host && !process.env.HOST) {
            this.#host = config.host
        }

        const controllers = glob.sync(path.join(this.#root, "controllers", "*.controller.ts"))
        controllers.forEach(controller => {
            const classs = require(controller) as object

            Object.keys(classs).forEach(key => {
                // @ts-ignore
                new classs[key]()

                cache.setControllerFile({
                    // @ts-ignore
                    name: classs[key].name,
                    file: controller
                })
            })
        })

        cache.getAllController().forEach(controller => {
            controller.routes?.forEach(route => {
                const routePath = path.join('/', <string>controller.path, <string>route.path)
                if(route.method === Method.GET) {
                    console.log(controller.file)
                    this.#app.get(routePath, (req, res) => {
                        const control = require(<string>controller.file)
                        const classs = new control[controller.name]()
                        classs.request = req
                        classs.response = res
                        return classs[route.function]()
                    })
                }
            })
        })

    }

    listen() {
        this.#app.listen(this.#port, this.#host, () => {
            console.log(`Server launched on http://${this.#host}:${this.#port}`)
        })
    }
}

export { Bootstrapper };
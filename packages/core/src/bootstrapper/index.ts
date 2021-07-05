import * as express from "express";
import {Express} from "express";
import * as path from "path"
import cache from "../cache/controller"
import {BootstrapperConfig} from "../types"
import {Routes} from "./routes"
import * as exphbs from "express-handlebars"

class Bootstrapper {
    #app: Express = express()

    #port: number = parseInt(process.env.PORT || "8080")
    #host: string = process.env.HOST || "0.0.0.0"

    #root: string = path.join(process.cwd(), path.dirname(process.argv[1]).replace(process.cwd(), ''))

    constructor(config?: BootstrapperConfig) {
        if (config?.port && !process.env.PORT) {
            this.#port = config.port
        }
        if (config?.host && !process.env.HOST) {
            this.#host = config.host
        }
        // Set view engine
        this.#app.engine('handlebars', exphbs());
        this.#app.set('view engine', 'handlebars');
        this.#app.set('views', path.join(this.#root, "views"))
        // Generate controller
        cache.generateController(this.#root)
        // Generate routes
        const router = new Routes()
        router.generateRoutes()
        this.#app.use(router.getRouter())
    }

    listen() {
        this.#app.listen(this.#port, this.#host, () => {
            console.log(`Server launched on http://${this.#host}:${this.#port}`)
        })
    }
}

export { Bootstrapper };
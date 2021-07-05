import * as express from "express";
import {Express} from "express";
import * as path from "path"
import cache from "../cache/controller"
import {BootstrapperConfig} from "../types"
import {Routes} from "./routes"
import * as exphbs from "express-handlebars"
import * as bodyParser from "body-parser";

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
        config?.modules?.forEach(async module=> {
            const result = await module.beforeBootstrap(this.#root)
            if (!result) {
                process.exit(1)
            }
        })
        // Set support of JSON
        this.#app.use(bodyParser.json());
        this.#app.use(bodyParser.urlencoded({ extended: false }));
        // Set view engine
        this.#app.engine('handlebars', exphbs());
        this.#app.set('view engine', 'handlebars');
        this.#app.set('views', path.join(this.#root, "views"))
        // Set static folder
        this.#app.use('/static', express.static(path.join(this.#root, "static")))
        // Generate controller
        cache.generateController(this.#root)
        // Generate routes
        const router = new Routes()
        router.generateRoutes()
        this.#app.use(router.getRouter())
        // Launch app
        this.listen()
    }

    private listen() {
        this.#app.listen(this.#port, this.#host, () => {
            console.log(`Piston => Started at : http://${this.#host}:${this.#port}`)
        })
    }
}

export { Bootstrapper };
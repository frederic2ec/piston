import "reflect-metadata"
import {createConnection} from "typeorm";
import * as glob from "glob";
import * as path from "path";
import {TypeormConfig} from "./types";

class TypeormModule {
    #config: TypeormConfig
    #entities = []

    constructor(config: TypeormConfig) {
        if(config) {
            this.#config = config
        }

    }
    public beforeBootstrap(root: string) {
        return new Promise((resolve, _) => {
            const models = glob.sync(path.join(root, "models", "*.model.*"))
            models.forEach(model => {
                const classs = require(model) as object

                Object.keys(classs).forEach(key => {
                    // @ts-ignore
                    this.#entities.push(classs[key])
                })
            })

            this.#config.entities = this.#entities

            // @ts-ignore
            createConnection(this.#config).then((_) => {
                console.log("TypeORM => Connection successful !")
                resolve(true)
            }).catch(err => {
                console.log("TypeORM => ", err)
                resolve(false)
            })
        })
    }
}

export { TypeormModule }
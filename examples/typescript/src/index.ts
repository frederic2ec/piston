import "reflect-metadata"
import { Bootstrapper } from "@piston/core"
//import {TypeormModule} from "@piston/typeorm";

new Bootstrapper({
    host: "0.0.0.0",
    port: 3030,
    modules: [
        // new TypeormModule(
        //     {
        // type: "postgres",
        // host: "localhost",
        // port: 5432,
        // username: "postgres",
        // password: "test123",
        // database: "test",
        // synchronize: true
        // }
        // )
    ]
})
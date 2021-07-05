import { Bootstrapper } from "@piston/core"

const test = new Bootstrapper({
    host: "0.0.0.0",
    port: 3030
})

test.listen()
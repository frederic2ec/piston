import {Controller, Get} from "@piston/core"

@Controller()
class HomeController {
    @Get()
    public Index() {
        console.log("hello")
        // @ts-ignore
        return this.response?.send("test")
    }

    @Get()
    public Privacy() {
        // @ts-ignore
        return this.response?.send('hello world')
    }
}

export { HomeController }
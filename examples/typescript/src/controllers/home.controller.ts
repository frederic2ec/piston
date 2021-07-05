import {Controller, Get, Send, View, Response, Request} from "@piston/core"

@Controller()
class HomeController {
    // @ts-ignore
    public response: Response
    // @ts-ignore
    public request: Request

    @Get()
    @Send()
    public Index() {
        return 'index home'
    }

    @Get()
    public Privacy() {
        return this.response.send('hello world')
    }

    @Get(":id")
    @View()
    public View() {
        // @ts-ignore
        return {data: this.request.params.id}
    }
}

export { HomeController }
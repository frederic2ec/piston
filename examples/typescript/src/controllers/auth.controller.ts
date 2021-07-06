import {Controller, Get, Json, Response, Request} from "@piston/core";

@Controller()
class AuthController {
    response: Response
    request: Request

    @Get("/")
    public async Index() {
        return this.response.send('wow')
    }

    @Get()
    @Json()
    public Delete() {
        return {hi: 'hello'}
    }
}

export {AuthController}
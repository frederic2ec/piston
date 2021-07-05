import {Controller, Get, Json} from "@piston/core";
@Controller()
class AuthController {
    @Get()
    public Index() {
        console.log("wow")
        // @ts-ignore
        return this.response.send('wow')
    }

    @Get()
    @Json()
    public Delete() {
        return {hi: 'hello'}
    }
}

export {AuthController}
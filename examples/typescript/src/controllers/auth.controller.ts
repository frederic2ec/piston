import {Controller, Get, Json} from "@piston/core";
import {getManager} from  "typeorm"
import {UserModel} from "../models/user.model"


@Controller()
class AuthController {
    @Get()
    public async Index() {
        console.log("wow")
        console.log(await getManager().findOne(UserModel, 1))
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
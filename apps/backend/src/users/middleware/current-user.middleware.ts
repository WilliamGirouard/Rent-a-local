import { Injectable, NestMiddleware } from "@nestjs/common";
import { UsersService } from "../service/users.service";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{

    constructor(private usersService: UsersService){}

    async use(req:any, res:any, next : () => void) {
        const {userId} = req.session || {};

        if (userId){
            const user = await this.usersService.findOne(userId);
            req.currentUser = user
        }
        next();
    }
}
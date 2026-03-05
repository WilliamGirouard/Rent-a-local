import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../service/users.service";

@Injectable()
export class AdminGuard implements CanActivate{
    
    constructor(private usersService: UsersService){}

    async canActivate(context: ExecutionContext) {
        //Verif qui return thruthy or falsy

        const request = context.switchToHttp().getRequest();
        const userId = request.session.userId;

        const user = await this.usersService.findOne(userId)

        return (user.admin)
    }
}
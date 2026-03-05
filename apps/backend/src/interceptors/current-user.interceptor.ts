import { CallHandler, ExecutionContext, Injectable, NestInterceptor, } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService : UsersService){}

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        // Recup User.ID
        const request = context.switchToHttp().getRequest();
        const userID = request['user'].sub;
        if (!userID) {
            return next.handle();
        }
        // Retrouver le bon user
        const user = await this.userService.findOneUserById(userID);
        request.currentUser = user
        // Continuer le cycle de la vie de la request
        return next.handle();
    }
}
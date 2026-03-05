import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { UsersService } from "../service/users.service";
import { map, Observable } from "rxjs";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{

    constructor(private usersService: UsersService){}

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        // Récup UserId
        const {userId} = request.session || {};
        if (!userId){
            return next.handle();
        }
        // Retrouver le bon user
        const user = await this.usersService.findOne(userId)
        
        // Assigner le champ de la requete
        request.currentUser = user
        
        // Continuer le cycle de vie de la requete
        return next.handle();
    }
}
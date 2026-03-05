import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../service/users.service";
import { Observable } from "rxjs";
export declare class CurrentUserInterceptor implements NestInterceptor {
    private usersService;
    constructor(usersService: UsersService);
    intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>>;
}

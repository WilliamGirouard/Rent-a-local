import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";
export declare class CurrentUserInterceptor implements NestInterceptor {
    private userService;
    constructor(userService: UsersService);
    intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>>;
}

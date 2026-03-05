import { CanActivate, ExecutionContext } from "@nestjs/common";
import { UsersService } from "../service/users.service";
export declare class AdminGuard implements CanActivate {
    private usersService;
    constructor(usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

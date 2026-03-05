import { NestMiddleware } from "@nestjs/common";
import { UsersService } from "../service/users.service";
export declare class CurrentUserMiddleware implements NestMiddleware {
    private usersService;
    constructor(usersService: UsersService);
    use(req: any, res: any, next: () => void): Promise<void>;
}

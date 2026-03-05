import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Role } from "src/users/roles/roles.enum";

//Doit recup les roles des users et retourner un boolean si la personne a les rôles requis
export class AdminGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const userRole = request['user'].role;
        if (userRole === Role.Admin) {
            return true;
        }else{
            throw new UnauthorizedException("Vous n'avez pas l'autorisation.")
        }
    }
}
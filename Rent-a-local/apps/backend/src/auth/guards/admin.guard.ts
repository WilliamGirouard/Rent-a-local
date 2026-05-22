import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Role } from "src/users/roles/roles.enum";

//Doit recup les roles des users et retourner un boolean si la personne a les rôles requis

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException("No user found");
    }

    if (user.role === Role.Admin) {
      return true;
    }

    throw new ForbiddenException("Admin only");
  }
}
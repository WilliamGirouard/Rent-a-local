import { CanActivate, ExecutionContext } from "@nestjs/common";

//Doit recup les roles des users et retourner un boolean si la personne a les rôles requis
export class RolesGuard implements CanActivate {
    
    canActivate(context: ExecutionContext): boolean{
        
        return false;
    }
}
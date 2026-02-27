import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JsonWebTokenError, JwtService } from "@nestjs/jwt";
import { Request } from "express";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService : JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.session.token?.access_token;
        if (!token) {
            throw new UnauthorizedException("Vous n'avez pas l'autorisation.")
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            request['user'] = payload;
        }catch (error) {
            throw new UnauthorizedException("Vous n'avez pas l'autorisation");
        }
        return true;
    }
}
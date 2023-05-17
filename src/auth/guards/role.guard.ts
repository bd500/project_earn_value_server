import {Reflector} from "@nestjs/core";
import {CanActivate, ExecutionContext} from "@nestjs/common";

export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const {user} = context.switchToHttp().getRequest();

        // console.log(user);

        if (!user) return false;

        return user.isAdmin;
    }
}

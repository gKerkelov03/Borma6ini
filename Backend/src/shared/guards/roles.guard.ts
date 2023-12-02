import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const { user } = context.switchToHttp().getRequest(),
            requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
                context.getHandler(),
                context.getClass()
            ]);

        if (!requiredRoles) {
            return true;
        }

        if (!user && requiredRoles) {
            return false;
        }

        return requiredRoles.some((role) => user.roles.includes(role));
    }
}

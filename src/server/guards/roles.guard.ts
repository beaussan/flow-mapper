import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../modules/user/user.entity';
import { Role } from '../modules/user/role.entity';

/**
 * A guard to prevent access to a route if the user doses not have the role required
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    if (process.env.IS_AUTH_ENABLED !== 'true') {
      return true;
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () =>
      user.roles.some((role: Role) => roles.includes(role.key)) ||
      user.isSuperUser;

    const tmp = user && user.roles && hasRole();
    return tmp;
  }
}

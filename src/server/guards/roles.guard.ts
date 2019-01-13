import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../modules/user/role.entity';

/**
 * A guard to prevent access to a route if the user doses not have the role required
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    if (process.env.IS_AUTH_ENABLED !== 'true') {
      console.log('AUTH NOT ENABLED');
      return true;
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const isSupserUser =
      this.reflector.get<boolean>('isSuperUser', context.getHandler()) || false;
    if (!roles && !isSupserUser) {
      console.log('ROLES NOT FOUND');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('[role guard] USER : ', user);

    if (isSupserUser) {
      const hasPermission = () => user.isSuperUser;
      return user && hasPermission();
    }

    const hasRole = () =>
      user.roles.some((role: Role) => roles.includes(role.key)) ||
      user.isSuperUser;

    return user && user.roles && hasRole();
  }
}

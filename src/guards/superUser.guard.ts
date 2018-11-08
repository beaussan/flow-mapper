import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../modules/user/user.entity';

@Injectable()
export class SuperUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    if (process.env.IS_AUTH_ENABLED !== 'true') {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const hasRole = () => user.isSuperUser;

    return user && user.roles && hasRole();
  }
}

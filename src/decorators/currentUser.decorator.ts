import { createParamDecorator } from '@nestjs/common';
import { User } from '../modules/user/user.entity';

export const CurrentUser = createParamDecorator(
  (data: any, req: any): User => {
    console.log('CURRENNTN USER : ', req.user);
    return req.user;
  },
);

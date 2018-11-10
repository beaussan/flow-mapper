import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate(payload: JwtPayload, done: (a, b) => void): any {
    if (process.env.IS_AUTH_ENABLED !== 'true') {
      done(null, true);
      return;
    }

    console.log('JWT VALIDATOR');

    const user = await this.authService.findUserById(payload.sub);
    if (!user.isPresent) {
      console.log('USER NOT FOUND', payload.sub);
      return done(new UnauthorizedException(), false);
    }

    done(null, user.get());
  }
}

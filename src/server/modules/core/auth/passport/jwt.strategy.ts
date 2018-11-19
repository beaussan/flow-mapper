import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as passport from 'passport';

import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: process.env.JWT_SECRET,
      },
      async (req, payload, next) => await this.verify(req, payload, next),
    );
    passport.use(this);
  }

  public async verify(req, payload, done) {
    if (process.env.IS_AUTH_ENABLED !== 'true') {
      done(null, true);
      return;
    }

    console.log('JWT VALIDATOR');

    const user = await this.authService.findUserById(payload.sub);
    if (!user.isPresent) {
      console.log('USER NOT FOUND', payload.sub);
      throw new UnauthorizedException();
    }

    done(null, user.get());
    return;
  }

  public async validate(
    payload: JwtPayload,
    done: (a, b) => void,
  ): Promise<any> {
    if (process.env.IS_AUTH_ENABLED !== 'true') {
      done(null, true);
      return;
    }

    console.log('JWT VALIDATOR');

    const user = await this.authService.findUserById(payload.sub);
    if (!user.isPresent) {
      console.log('USER NOT FOUND', payload.sub);
      throw new UnauthorizedException();
    }

    done(null, user.get());
    return;
  }
}

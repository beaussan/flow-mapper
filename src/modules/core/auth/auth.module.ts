import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { TwitterStrategy } from './passport/twitter.strategy';
import { FacebookStrategy } from './passport/facebook.strategy';
import { GoogleStrategy } from './passport/google-plus.strategy';
import { bodyValidatorMiddleware } from './middlewares/auth-body-validator.middleware';
import { authenticate } from 'passport';
import { UserModule } from '../../user/user.module';
import { CryptoModule } from '../crypto/crypto.module';
import { googleConfig } from './config/google-config';
import {
  FACEBOOK_CONFIG_TOKEN,
  GOOGLE_CONFIG_TOKEN,
  TWITTER_CONFIG_TOKEN,
} from './auth.constants';
import { twitterConfig } from './config/twitter-config';
import { facebookConfig } from './config/facebook-config';

@Module({
  imports: [UserModule, CryptoModule],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    FacebookStrategy,
    TwitterStrategy,
    GoogleStrategy,
    {
      provide: FACEBOOK_CONFIG_TOKEN,
      useValue: facebookConfig,
    },
    {
      provide: TWITTER_CONFIG_TOKEN,
      useValue: twitterConfig,
    },
    {
      provide: GOOGLE_CONFIG_TOKEN,
      useValue: googleConfig,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        bodyValidatorMiddleware,
        authenticate('local-signup', { session: false }),
      )
      .forRoutes('api/auth/local/signup');

    consumer
      .apply(
        bodyValidatorMiddleware,
        authenticate('local-signin', { session: false }),
      )
      .forRoutes('api/auth/local/signin');

    consumer
      .apply(authenticate('facebook', { session: false }))
      .forRoutes('api/auth/facebook/token');

    consumer
      .apply(authenticate('twitter', { session: false }))
      .forRoutes('api/auth/twitter/token');

    consumer
      .apply(authenticate('google', { session: false }))
      .forRoutes('api/auth/google/token');
  }
}

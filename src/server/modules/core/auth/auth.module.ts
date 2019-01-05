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
import { authProviders } from './auth.providers';
import { CryptoModule } from '../crypto/crypto.module';
import { UserModule } from '../../user/user.module';
import { FacebookController } from './facebook.controller';
import { TwitterController } from './twitter.controller';
import { GoogleController } from './google.controller';

@Module({
  imports: [UserModule, CryptoModule],
  providers: [
    ...authProviders,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    process.env.FB_AUTH_ENABLED === 'true' ? FacebookStrategy : undefined,
    process.env.TWITTER_AUTH_ENABLED === 'true' ? TwitterStrategy : undefined,
    process.env.GOOGLE_AUTH_ENABLED === 'true' ? GoogleStrategy : undefined,
  ].filter(val => val !== undefined),
  controllers: [
    process.env.IS_AUTH_ENABLED === 'true' ? AuthController : undefined,
    process.env.FB_AUTH_ENABLED === 'true' ? FacebookController : undefined,
    process.env.TWITTER_AUTH_ENABLED === 'true' ? TwitterController : undefined,
    process.env.GOOGLE_AUTH_ENABLED === 'true' ? GoogleController : undefined,
  ].filter(val => val !== undefined),
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    if (process.env.LOCAL_REGISTER_ENABLED === 'true') {
      consumer
        .apply(
          bodyValidatorMiddleware,
          authenticate('local-signup', { session: false }),
        )
        .forRoutes('auth/local/register');
    }
    consumer
      .apply(
        bodyValidatorMiddleware,
        authenticate('local-signin', { session: false }),
      )
      .forRoutes('auth/local/login');

    if (process.env.FB_AUTH_ENABLED === 'true') {
      consumer
        .apply(authenticate('facebook', { session: false }))
        .forRoutes('auth/facebook/token');
    }

    if (process.env.TWITTER_AUTH_ENABLED === 'true') {
      consumer
        .apply(authenticate('twitter', { session: false }))
        .forRoutes('auth/twitter/token');
    }

    if (process.env.GOOGLE_AUTH_ENABLED === 'true') {
      consumer
        .apply(authenticate('google', { session: false }))
        .forRoutes('auth/google/token');
    }
  }
}

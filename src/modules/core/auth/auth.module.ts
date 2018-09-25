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

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    FacebookStrategy,
    TwitterStrategy,
    GoogleStrategy,
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

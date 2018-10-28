import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { use } from 'passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy {
  constructor(private readonly authService: AuthService) {
    this.init();
  }

  private init(): void {
    use(
      'local-signup',
      new Strategy(
        {
          usernameField: 'email',
          passwordField: 'password',
        },
        async (email: string, password: string, done: (a, b) => void) => {
          try {
            if ((await this.authService.findOneWithEmail(email)).isPresent) {
              return done(
                new UnauthorizedException('MESSAGES.UNAUTHORIZED_EMAIL_IN_USE'),
                false,
              );
            }

            const user = await this.authService.registerUser(email, password);

            done(null, user);
          } catch (error) {
            done(error, false);
          }
        },
      ),
    );

    use(
      'local-signin',
      new Strategy(
        {
          usernameField: 'email',
          passwordField: 'password',
        },
        async (email: string, password: string, done: (a, b) => void) => {
          try {
            const user = await this.authService.findOneWithEmail(email);

            if (!user.isPresent) {
              return done(
                new UnauthorizedException(
                  'MESSAGES.UNAUTHORIZED_INVALID_EMAIL',
                ),
                false,
              );
            }

            if (this.authService.doPasswordMatch(user.get(), password)) {
              return done(
                new UnauthorizedException(
                  'MESSAGES.UNAUTHORIZED_INVALID_PASSWORD',
                ),
                false,
              );
            }

            done(null, user.get());
          } catch (error) {
            done(error, false);
          }
        },
      ),
    );
  }
}

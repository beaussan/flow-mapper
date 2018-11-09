import { Injectable, Inject } from '@nestjs/common';
import { use } from 'passport';
import * as GoogleTokenStrategy from 'passport-google-plus-token';

// import { GOOGLE_CONFIG_TOKEN, USER_MODEL_TOKEN } from '../../../server.constants';
import { GoogleConfig } from '../interfaces/google-config.interface';
import { AuthService } from '../auth.service';
import { GOOGLE_CONFIG_TOKEN } from '../auth.constants';
// import { IUser } from '../../user/interfaces/user.interface';

@Injectable()
export class GoogleStrategy {
  constructor(
    @Inject(GOOGLE_CONFIG_TOKEN) private readonly googleConfig: GoogleConfig,
    private readonly authService: AuthService,
  ) {
    this.init();
  }

  private init(): void {
    use(
      'google',
      new GoogleTokenStrategy(
        {
          clientID: this.googleConfig.client_id || '',
          clientSecret: this.googleConfig.client_secret || '',
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: (a, b) => void,
        ) => {
          try {
            const existingUser = await this.authService.findOneWithGoogleId(
              profile.id,
            );

            if (existingUser) {
              return done(null, existingUser);
            }

            const { id, displayName } = profile;
            const email: string = profile.emails.shift().value;
            const user = this.authService.registerGoogle(
              email,
              id,
              displayName,
            );

            done(null, user);
          } catch (err) {
            done(err, null);
          }
        },
      ),
    );
  }
}

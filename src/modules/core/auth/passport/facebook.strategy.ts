import { Injectable, Inject } from '@nestjs/common';
import { use } from 'passport';
import * as FacebookTokenStrategy from 'passport-facebook-token';
// import { FACEBOOK_CONFIG_TOKEN, USER_MODEL_TOKEN } from '../../../server.constants';
import { FacebookConfig } from '../interfaces/facebook-config.interface';
import { AuthService } from '../auth.service';

// const FacebookTokenStrategy = require('passport-facebook-token');

@Injectable()
export class FacebookStrategy {
  constructor(
    // @Inject(FACEBOOK_CONFIG_TOKEN) private readonly fbConfig: FacebookConfig,
    private readonly authService: AuthService,
  ) {
    this.init();
  }

  private init(): void {
    use(
      'facebook',
      new FacebookTokenStrategy(
        {
          clientID: 'TOTO', // this.fbConfig.client_id,
          clientSecret: 'TOTO', // this.fbConfig.client_secret
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: (a, b) => void,
        ) => {
          try {
            const existingUser = await this.authService.findOneWithFbId(
              profile.id,
            );

            if (existingUser) {
              return done(null, existingUser);
            }

            const email: string = profile.emails.shift().value;
            const user = this.authService.registerFacebookUser(
              email,
              profile.id,
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

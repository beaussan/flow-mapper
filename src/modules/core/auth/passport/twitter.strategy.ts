import { Injectable, Inject } from '@nestjs/common';
import { use } from 'passport';

// import { USER_MODEL_TOKEN, TWITTER_CONFIG_TOKEN } from '../../../server.constants';
// import { IUser } from '../../user/interfaces/user.interface';
import { TwitterConfig } from '../interfaces/twitter-config.interface';
import * as TwitterTokenStrategy from 'passport-twitter-token';
import { AuthService } from '../auth.service';

@Injectable()
export class TwitterStrategy {
  constructor(
    // @Inject(TWITTER_CONFIG_TOKEN) private readonly twitterConfig: TwitterConfig,
    private readonly authService: AuthService,
  ) {
    this.init();
  }

  private init(): void {
    use(
      'twitter',
      new TwitterTokenStrategy(
        {
          consumerKey: 'TOTO', // this.twitterConfig.consumer_key,
          consumerSecret: 'TOTO', // this.twitterConfig.consumer_secret
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: (a, b) => void,
        ) => {
          try {
            const existingUser = await this.authService.findOneWithTwitterId(
              profile.id,
            );

            if (existingUser) {
              return done(null, existingUser);
            }

            const { id, username, displayName } = profile;
            const user = this.authService.registerTwitter(
              id,
              username,
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

import { googleConfig } from './config/google-config';
import {
  FACEBOOK_CONFIG_TOKEN,
  GOOGLE_CONFIG_TOKEN,
  TWITTER_CONFIG_TOKEN,
} from './auth.constants';
import { twitterConfig } from './config/twitter-config';
import { facebookConfig } from './config/facebook-config';

export const authProviders = [
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
];

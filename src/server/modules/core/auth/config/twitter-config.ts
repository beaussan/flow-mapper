import { TwitterConfig } from '../interfaces/twitter-config.interface';

export const twitterConfig: TwitterConfig = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  request_token_uri: 'https://api.twitter.com/oauth/request_token',
  login_dialog_uri: 'https://api.twitter.com/oauth/authenticate',
  access_token_uri: 'https://api.twitter.com/oauth/access_token',
  oauth_redirect_uri: process.env.OAUTH_REDIRECT_URI,
};

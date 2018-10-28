import { FacebookConfig } from '../interfaces/facebook-config.interface';

export const facebookConfig: FacebookConfig = {
  login_dialog_uri: 'https://www.facebook.com/v2.12/dialog/oauth',
  access_token_uri: 'https://graph.facebook.com/v2.12/oauth/access_token',
  client_id: process.env.FB_CLIENT_ID,
  client_secret: process.env.FB_CLIENT_SECRET,
  oauth_redirect_uri: process.env.OAUTH_REDIRECT_URI,
  state: '{fbstate}',
};

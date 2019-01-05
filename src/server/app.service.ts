import { Injectable } from '@nestjs/common';
import { AppConfigDto } from './app.config.dto';

@Injectable()
export class AppService {
  getConfig(): AppConfigDto {
    return {
      isAuthEnabled: process.env.IS_AUTH_ENABLED === 'true',
      isFacebookAuthEnabled: process.env.FB_AUTH_ENABLED === 'true',
      isGoogleAuthEnabled: process.env.GOOGLE_AUTH_ENABLED === 'true',
      isTwitterAuthEnabled: process.env.TWITTER_AUTH_ENABLED === 'true',
      isLocalRegisterEnabled: process.env.LOCAL_REGISTER_ENABLED === 'true',
    };
  }
}

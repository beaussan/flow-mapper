import { Injectable } from '@nestjs/common';
import { Token } from './interfaces/token.interface';

@Injectable()
export class AuthService {
  createToken(user: any): Token {
    return {
      token: 'TOTO',
    };
  }

  requestFacebookRedirectUri() {
    return { redirect_uri: 'TOTO' };
  }

  facebookSignIn(code: any): Token {
    return {
      token: 'TOTO',
    };
  }

  requestTwitterRedirectUri() {}

  twitterSignIn(oauth_token: any, oauth_verifier: any) {}

  requestGoogleRedirectUri() {}

  googleSignIn(code: any) {}

  findUserById(id: string) {
    return {};
  }

  findOneWithEmail(email: string) {}

  findOneWithFbId(id: number) {}

  registerFacebookUser(email, id) {}

  findOneWithGoogleId(id: number) {}

  registerGoogle(email, id, displayName) {}

  findOneWithTwitterId(id: number) {}

  registerTwitter(id, username, displayName) {}

  registerUser(email, password) {}

  doPasswordMatch(user, password): boolean {
    return true;
  }
}

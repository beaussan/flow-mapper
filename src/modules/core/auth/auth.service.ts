import { Inject, Injectable } from '@nestjs/common';
import { Token } from './interfaces/token.interface';
import { UserService } from '../../user/user.service';
import { CryptoService } from '../crypto/crypto.service';
import { AuthType, User } from '../../user/user.entity';
import { sign } from 'jsonwebtoken';
import Optional from 'typescript-optional';
import {
  FACEBOOK_CONFIG_TOKEN,
  GOOGLE_CONFIG_TOKEN,
  TWITTER_CONFIG_TOKEN,
} from './auth.constants';
import { FacebookConfig } from './interfaces/facebook-config.interface';
import { TwitterConfig } from './interfaces/twitter-config.interface';
import { GoogleConfig } from './interfaces/google-config.interface';
import { get, post, Response } from 'request';

@Injectable()
export class AuthService {
  private url: string;

  constructor(
    private readonly userService: UserService,
    private readonly crypto: CryptoService,
    @Inject(FACEBOOK_CONFIG_TOKEN) private readonly fbConfig: FacebookConfig,
    @Inject(TWITTER_CONFIG_TOKEN) private readonly twitterConfig: TwitterConfig,
    @Inject(GOOGLE_CONFIG_TOKEN) private readonly googleConfig: GoogleConfig,
  ) {
    this.url = `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${
      process.env.API_PORT
    }`;
  }

  createToken(user: User): Token {
    const expiresIn: string = '48h';
    const token: string = sign(
      {
        sub: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn },
    );

    return {
      token,
      expiresIn,
    };
  }

  requestFacebookRedirectUri() {
    const queryParams: string[] = [
      `client_id=${this.fbConfig.client_id}`,
      `redirect_uri=${this.fbConfig.oauth_redirect_uri}`,
      `state=${this.fbConfig.state}`,
    ];
    const redirect_uri: string = `${
      this.fbConfig.login_dialog_uri
    }?${queryParams.join('&')}`;

    return {
      redirect_uri,
    };
  }

  facebookSignIn(code: any): Promise<Token> {
    const queryParams: string[] = [
      `client_id=${this.fbConfig.client_id}`,
      `redirect_uri=${this.fbConfig.oauth_redirect_uri}`,
      `client_secret=${this.fbConfig.client_secret}`,
      `code=${code}`,
    ];
    const uri: string = `${this.fbConfig.access_token_uri}?${queryParams.join(
      '&',
    )}`;

    return new Promise(
      (resolve: (data: any) => void, reject: (data: any) => void) => {
        get(uri, (error: Error, response: Response, body: any) => {
          if (error) {
            return reject(error);
          }

          if (body.error) {
            return reject(body.error);
          }

          const { access_token } = JSON.parse(body);

          post(
            {
              url: `${this.url}/api/auth/facebook/token`,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              form: {
                access_token,
              },
            },
            async (err: Error, res: Response, bodyToken: any) => {
              if (err) {
                return reject(err);
              }

              if (bodyToken.error) {
                return reject(bodyToken.error);
              }

              resolve(bodyToken);
            },
          );
        });
      },
    );
  }

  requestTwitterRedirectUri() {
    return new Promise(
      (resolve: (data: any) => void, reject: (data: any) => void) => {
        post(
          {
            url: this.twitterConfig.request_token_uri,
            oauth: {
              consumer_key: this.twitterConfig.consumer_key,
              consumer_secret: this.twitterConfig.consumer_secret,
              callback: this.twitterConfig.oauth_redirect_uri,
            },
          },
          async (err: Error, res: Response, body: any) => {
            if (err) {
              return reject(err);
            }

            if (body.error) {
              return reject(body.error);
            }

            const { oauth_token } = this.parseTwitterResponse(body);
            const redirect_uri: string = `${
              this.twitterConfig.login_dialog_uri
            }?oauth_token=${oauth_token}`;

            resolve({
              redirect_uri,
            });
          },
        );
      },
    );
  }

  twitterSignIn(oauth_token_request: any, oauth_verifier: any) {
    return new Promise(
      (resolve: (data: any) => void, reject: (data: any) => void) => {
        post(
          {
            url: this.twitterConfig.access_token_uri,
            oauth: {
              consumer_key: this.twitterConfig.consumer_key,
              consumer_secret: this.twitterConfig.consumer_secret,
              token: oauth_token_request,
              verifier: oauth_verifier,
            },
          },
          async (err: Error, res: Response, body: any) => {
            if (err) {
              return reject(err);
            }

            if (body.error) {
              return reject(body.error);
            }

            const {
              oauth_token,
              oauth_token_secret,
              user_id,
            } = this.parseTwitterResponse(body);

            post(
              {
                url: `${this.url}/api/auth/twitter/token`,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                form: {
                  oauth_token,
                  oauth_token_secret,
                  user_id,
                },
              },
              async (errToken: Error, resToken: Response, bodyToken: any) => {
                if (errToken) {
                  return reject(errToken);
                }

                if (bodyToken.error) {
                  return reject(bodyToken.error);
                }

                resolve(bodyToken);
              },
            );
          },
        );
      },
    );
  }

  async requestGoogleRedirectUri(): Promise<{ redirect_uri: string } | any> {
    const queryParams: string[] = [
      `client_id=${this.googleConfig.client_id}`,
      `redirect_uri=${this.googleConfig.oauth_redirect_uri}`,
      `response_type=${this.googleConfig.response_type}`,
      `scope=${this.googleConfig.scopes.join(' ')}`,
    ];
    const redirect_uri: string = `${
      this.googleConfig.login_dialog_uri
    }?${queryParams.join('&')}`;

    return {
      redirect_uri,
    };
  }

  googleSignIn(code: string): Promise<any> {
    return new Promise(
      (resolve: (data: any) => void, reject: (data: any) => void) => {
        post(
          {
            url: this.googleConfig.access_token_uri,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            form: {
              code,
              client_id: this.googleConfig.client_id,
              client_secret: this.googleConfig.client_secret,
              redirect_uri: this.googleConfig.oauth_redirect_uri,
              grant_type: this.googleConfig.grant_type,
            },
          },
          async (err: Error, res: Response, body: any) => {
            if (err) {
              return reject(err);
            }

            if (body.error) {
              return reject(body.error);
            }

            const { access_token } = JSON.parse(body);

            post(
              {
                url: `${this.url}/api/auth/google/token`,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                form: {
                  access_token,
                },
              },
              async (errToken: Error, resToken: Response, bodyToken: any) => {
                if (errToken) {
                  return reject(errToken);
                }

                if (bodyToken.error) {
                  return reject(bodyToken.error);
                }

                resolve(bodyToken);
              },
            );
          },
        );
      },
    );
  }

  async findUserById(id: number): Promise<Optional<User>> {
    return this.userService.findOneById(id);
  }

  findOneWithEmail(email: string): Promise<Optional<User>> {
    return this.userService.findOneWithEmailIgnoringCase(email);
  }

  findOneWithFbId(id: string): Promise<Optional<User>> {
    return this.userService.findOneWithWithFacebookId(id);
  }

  registerFacebookUser(email: string, id: string) {
    const user = new User();
    user.authType = AuthType.FACEBOOK;
    user.facebookEmail = email;
    user.facebookId = id;
    return this.userService.saveOne(user);
  }

  findOneWithGoogleId(id: string): Promise<Optional<User>> {
    return this.userService.findOneWithWithGoogleId(id);
  }

  registerGoogle(email: string, id: string, displayName: string) {
    const user = new User();
    user.authType = AuthType.GOOGLE;
    user.googleEmail = email;
    user.googleId = id;
    user.googleDisplayName = displayName;
    return this.userService.saveOne(user);
  }

  findOneWithTwitterId(id: string): Promise<Optional<User>> {
    return this.userService.findOneWithWithTwitterId(id);
  }

  registerTwitter(id: string, username: string, displayName: string) {
    const user = new User();
    user.authType = AuthType.TWITTER;
    user.twitterId = id;
    user.twitterUsername = username;
    user.twitterDisplayName = displayName;
    return this.userService.saveOne(user);
  }

  async registerUser(email: string, password: string): Promise<User> {
    const user = new User();
    user.authType = AuthType.LOCAL;
    user.localPassword = await this.crypto.hash(password);
    user.localEmail = email;
    return this.userService.saveOne(user);
  }

  doPasswordMatch(user: User, password: string): Promise<boolean> {
    return this.crypto.compare(password, user.localPassword);
  }

  private parseTwitterResponse(
    response: string,
  ): { [key: string]: string | boolean } {
    const regex: RegExp = /([a-z_]+?)=([a-zA-Z0-9_-]+)/g;
    const parsedResponse: { [key: string]: string } = {};

    let match: RegExpMatchArray = regex.exec(response);

    while (match) {
      match.shift();

      parsedResponse[match.shift()] = match.shift();

      match = regex.exec(response);
    }

    return parsedResponse;
  }
}

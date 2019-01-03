import { User } from '../types/auth';

const tag = '[Auth]';

export class AuthLoginRequest {
  static readonly type = `${tag} request login user`;

  constructor(public email: string, public password: string) {}
}

export class AuthLoginSuccess {
  static readonly type = `${tag} success login user`;

  constructor(public user: User) {}
}

export class AuthLoginFailure {
  static readonly type = `${tag} error login user`;

  constructor(public error: Error) {}
}

export class SaveToken {

  static readonly type = `${tag} save user token`;

  constructor(public token: string) {}
}
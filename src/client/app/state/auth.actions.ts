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

export class TryLoginWithToken {
  static readonly type = `${tag} try logging with current token`;

  constructor() {}
}

export class Logout {
  static readonly type = `${tag} logout user`;

  constructor() {}
}

export class AuthRegisterRequest {
  static readonly type = `${tag} request auth register`;

  constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}
}

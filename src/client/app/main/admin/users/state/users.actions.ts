import { User } from '../../../../types/auth';
import { UserCreation } from '../types/userCreation';

const tag = '[Users]';

export class UserAllRequest {
  static readonly type = `${tag} request all users`;

  constructor() {}
}

export class UserAllSuccess {
  static readonly type = `${tag} success all users`;

  constructor(public user: User[]) {}
}

export class UserAllFailure {
  static readonly type = `${tag} error all users`;

  constructor(public error: Error) {}
}

export class PromoteUser {
  static readonly type = `${tag} promopting user`;

  constructor(public userId: number) {}
}

export class DemoteUser {
  static readonly type = `${tag} demote user`;

  constructor(public userId: number) {}
}

export class SetUserRoles {
  static readonly type = `${tag} set user roles`;

  constructor(public userId: number, public roles: string[]) {}
}

export class CreateUser {
  static readonly type = `${tag} creating user`;

  constructor(public user: UserCreation) {}
}

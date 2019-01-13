import { App } from '../types/app';
const tag = '[App]';

// Fetch All
export class FetchAllAppRequest {
  static readonly type = `${tag} fetchAll request`;

  constructor() {}
}

export class FetchAllAppSuccess {
  static readonly type = `${tag} fetchAll success`;

  constructor(public apps: App[]) {}
}

export class FetchAllAppFailure {
  static readonly type = `${tag} fetchAll error`;

  constructor(public error: Error) {}
}

// Fetch One
export class FetchOneAppRequest {
  static readonly type = `${tag} fetchOne request`;

  constructor(public id: number) {}
}

export class FetchOneAppSuccess {
  static readonly type = `${tag} fetchOne success`;

  constructor(public currentApp: App) {}
}

export class FetchOneAppFailure {
  static readonly type = `${tag} fetchOne error`;

  constructor(public error: Error) {}
}

// Create
export class CreateAppRequest {
  static readonly type = `${tag} create request`;

  constructor(
    public name: string,
    public description: string,
    public technos: string[],
  ) {}
}

export class CreateAppSuccess {
  static readonly type = `${tag} create success`;

  constructor(public app: App) {}
}

export class CreateAppError {
  static readonly type = `${tag} create error`;

  constructor(public error: Error) {}
}

// Update
export class UpdateAppRequest {
  static readonly type = `${tag} update request`;

  constructor(
    public id: number,
    public name: string,
    public description: string,
    public technos: string[],
  ) {}
}

export class UpdateAppSuccess {
  static readonly type = `${tag} update success`;

  constructor(public app: App) {}
}

export class UpdateAppError {
  static readonly type = `${tag} update error`;

  constructor(public error: Error) {}
}

// Delete
export class DeleteAppRequest {
  static readonly type = `${tag} delete request`;

  constructor(public id: number) {}
}

export class DeleteAppSuccess {
  static readonly type = `${tag} delete success`;

  constructor(public id: number) {}
}

export class DeleteAppError {
  static readonly type = `${tag} delete error`;

  constructor(public error: Error) {}
}

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

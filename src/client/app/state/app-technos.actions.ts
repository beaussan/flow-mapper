import { ApiConfig } from '../types/api-config';
import { AppTechno } from '../types/app-technos';
const tag = '[AppTechno]';

// Fetch All
export class FetchAllAppTechnoRequest {
  static readonly type = `${tag} fetchAll request`;

  constructor() {}
}

export class FetchAllAppTechnoSuccess {
  static readonly type = `${tag} fetchAll success`;

  constructor(public appTechnos: AppTechno[]) {}
}

export class FetchAllAppTechnoFailure {
  static readonly type = `${tag} fetchAll error`;

  constructor(public error: Error) {}
}

// Fetch One
export class FetchOneAppTechnoRequest {
  static readonly type = `${tag} fetchOne request`;

  constructor(public id: number) {}
}

export class FetchOneAppTechnoSuccess {
  static readonly type = `${tag} fetchOne success`;

  constructor(public currentAppTechno: AppTechno) {}
}

export class FetchOneAppTechnoFailure {
  static readonly type = `${tag} fetchOne error`;

  constructor(public error: Error) {}
}

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

// Create
export class CreateAppTechnoRequest {
  static readonly type = `${tag} create request`;

  constructor(public name: string) {}
}

export class CreateAppTechnoSuccess {
  static readonly type = `${tag} create success`;

  constructor(public appTechno: AppTechno) {}
}

export class CreateAppTechnoError {
  static readonly type = `${tag} create error`;

  constructor(public error: Error) {}
}

// Update
export class UpdateAppTechnoRequest {
  static readonly type = `${tag} update request`;

  constructor(public id: number, public name: string) {}
}

export class UpdateAppTechnoSuccess {
  static readonly type = `${tag} update success`;

  constructor(public appTechno: AppTechno) {}
}

export class UpdateAppTechnoError {
  static readonly type = `${tag} update error`;

  constructor(public error: Error) {}
}

// Delete
export class DeleteAppTechnoRequest {
  static readonly type = `${tag} delete request`;

  constructor(public id: number) {}
}

export class DeleteAppTechnoSuccess {
  static readonly type = `${tag} delete success`;

  constructor(public id: number) {}
}

export class DeleteAppTechnoError {
  static readonly type = `${tag} delete error`;

  constructor(public error: Error) {}
}

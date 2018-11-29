import { ApiConfig } from '../types/api-config';
const tag = '[ApiConfig]';

export class ApiConfigRequest {
  static readonly type = `${tag} request api config`;

  constructor() {}
}

export class ApiConfigSuccess {
  static readonly type = `${tag} success api config`;

  constructor(public config: ApiConfig) {}
}

export class ApiConfigFailure {
  static readonly type = `${tag} error api config`;

  constructor(public error: Error) {}
}

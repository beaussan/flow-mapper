import { Flow } from '../types/flow';
const tag = '[Flow]';

export class FetchAllFlowsRequest {
  static readonly type = `${tag} fetchAll request`;

  constructor() {}
}

export class FetchAllFlowsSuccess {
  static readonly type = `${tag} fetchAll success`;

  constructor(public flows: Flow[]) {}
}

export class FetchAllFlowsError {
  static readonly type = `${tag} fetchAll error`;

  constructor(public error: Error) {}
}

export class FetchOneFlowRequest {
  static readonly type = `${tag} fetchOne request`;

  constructor(public id: number) {}
}

export class FetchOneFlowSuccess {
  static readonly type = `${tag} fetchOne success`;

  constructor(public currentFlow: Flow) {}
}

export class FetchOneFlowError {
  static readonly type = `${tag} fetchOne error`;

  constructor(public error: Error) {}
}

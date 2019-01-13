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

export class DeleteFlowRequest {
  static readonly type = `${tag} delete request`;

  constructor(public id: number) {}
}

export class DeleteFlowSuccess {
  static readonly type = `${tag} delete success`;

  constructor(public id: number) {}
}

export class DeleteFlowError {
  static readonly type = `${tag} delete error`;

  constructor(public error: Error) {}
}

export class UpdateFlowRequest {
  static readonly type = `${tag} update request`;

  constructor(
    public id: number,
    public name: string,
    public description: string,
    public sourceAppId: number,
    public destinationAppId: number,
    public flowTechnos: string[],
  ) {}
}

export class UpdateFlowSuccess {
  static readonly type = `${tag} update success`;

  constructor(public flow: Flow) {}
}

export class UpdateFlowError {
  static readonly type = `${tag} update error`;

  constructor(public error: Error) {}
}

export class CreateFlowRequest {
  static readonly type = `${tag} create request`;

  constructor(
    public name: string,
    public description: string,
    public sourceAppId: number,
    public destinationAppId: number,
    public flowTechnos: string[],
  ) {}
}

export class CreateFlowSuccess {
  static readonly type = `${tag} create success`;

  constructor(public flow: Flow) {}
}

export class CreateFlowError {
  static readonly type = `${tag} create error`;

  constructor(public error: Error) {}
}

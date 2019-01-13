import { FlowTechno } from '../types/flow-technos';
const tag = '[FlowTechno]';

export class FetchAllFlowTechnosRequest {
  static readonly type = `${tag} fetchAll request`;

  constructor() {}
}

export class FetchAllFlowTechnosSuccess {
  static readonly type = `${tag} fetchAll success`;

  constructor(public flowTechnos: FlowTechno[]) {}
}

export class FetchAllFlowTechnosError {
  static readonly type = `${tag} fetchAll error`;

  constructor(public error: Error) {}
}

export class FetchOneFlowTechnoRequest {
  static readonly type = `${tag} fetchOne request`;

  constructor(public id: number) {}
}

export class FetchOneFlowTechnoSuccess {
  static readonly type = `${tag} fetchOne success`;

  constructor(public currentFlowTechno: FlowTechno) {}
}

export class FetchOneFlowTechnoError {
  static readonly type = `${tag} fetchOne error`;

  constructor(public error: Error) {}
}

export class UpdateFlowTechnoRequest {
  static readonly type = `${tag} update request`;

  constructor(public id: number, public name: string) {}
}

export class UpdateFlowTechnoSuccess {
  static readonly type = `${tag} update success`;

  constructor(public flowTechno: FlowTechno) {}
}

export class UpdateFlowTechnoError {
  static readonly type = `${tag} update error`;

  constructor(public error: Error) {}
}

export class DeleteFlowTechnoRequest {
  static readonly type = `${tag} delete request`;

  constructor(public id: number) {}
}

export class DeleteFlowTechnoSuccess {
  static readonly type = `${tag} delete success`;

  constructor(public id: number) {}
}

export class DeleteFlowTechnoError {
  static readonly type = `${tag} delete error`;

  constructor(public error: Error) {}
}

export class CreateFlowTechnoRequest {
  static readonly type = `${tag} create request`;

  constructor(public name: string) {}
}

export class CreateFlowTechnoSuccess {
  static readonly type = `${tag} create success`;

  constructor(public flowTechno: FlowTechno) {}
}

export class CreateFlowTechnoError {
  static readonly type = `${tag} create error`;

  constructor(public error: Error) {}
}

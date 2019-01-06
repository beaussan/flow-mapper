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
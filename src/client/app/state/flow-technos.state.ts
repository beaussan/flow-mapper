import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, flatMap } from 'rxjs/operators';
import { FlowTechno } from '../types/flow-technos';
import { FlowTechnosService } from '../services/flow-technos.service';
import {
  FetchAllFlowTechnosRequest,
  FetchAllFlowTechnosSuccess,
  FetchAllFlowTechnosError,
  FetchOneFlowTechnoSuccess,
  FetchOneFlowTechnoRequest,
  FetchOneFlowTechnoError,
} from './flow-technos.actions';

export class FlowTechnosStateModel {
  public flowTechnos: FlowTechno[];
  public currentFlowTechno: FlowTechno;
  public isFetching: boolean;
}

@State<FlowTechnosStateModel>({
  name: 'FlowTechno',
  defaults: {
    flowTechnos: [],
    currentFlowTechno: undefined,
    isFetching: false,
  },
})
export class FlowTechnosState {
  @Selector()
  static flowTechnos(state: FlowTechnosStateModel): FlowTechno[] {
    return state.flowTechnos;
  }

  @Selector()
  static currentFlowTechno(state: FlowTechnosStateModel): FlowTechno {
    return state.currentFlowTechno;
  }
  constructor(private readonly flowTechnoService: FlowTechnosService) {}

  @Action(FetchAllFlowTechnosRequest)
  fetchAllFlowTechnosRequest(
    ctx: StateContext<FlowTechnosStateModel>,
    {  }: FetchAllFlowTechnosRequest,
  ) {
    return this.flowTechnoService.getAll().pipe(
      flatMap(data => ctx.dispatch(new FetchAllFlowTechnosSuccess(data))),
      catchError(err => ctx.dispatch(new FetchAllFlowTechnosError(err))),
    );
  }

  @Action(FetchAllFlowTechnosSuccess)
  fetchAllFlowTechnoSuccess(
    ctx: StateContext<FlowTechnosStateModel>,
    { flowTechnos }: FetchAllFlowTechnosSuccess,
  ) {
    ctx.patchState({ flowTechnos });
  }

  @Action(FetchOneFlowTechnoRequest)
  fetchOneFlowTechnoRequest(
    ctx: StateContext<FlowTechnosStateModel>,
    { id }: FetchOneFlowTechnoRequest,
  ) {
    return this.flowTechnoService.getOne(id).pipe(
      flatMap(data => ctx.dispatch(new FetchOneFlowTechnoSuccess(data))),
      catchError(err => ctx.dispatch(new FetchOneFlowTechnoError(err))),
    );
  }

  @Action(FetchOneFlowTechnoSuccess)
  fetchOneFlowTechnoSuccess(
    ctx: StateContext<FlowTechnosStateModel>,
    { currentFlowTechno }: FetchOneFlowTechnoSuccess,
  ) {
    ctx.patchState({ currentFlowTechno });
  }
}

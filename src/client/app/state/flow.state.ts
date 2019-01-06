import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, flatMap } from 'rxjs/operators';
import { Flow } from '../types/flow';
import { FlowsService } from '../services/flow.service';
import {
  FetchAllFlowsRequest,
  FetchAllFlowsSuccess,
  FetchAllFlowsError,
  FetchOneFlowRequest,
  FetchOneFlowSuccess,
  FetchOneFlowError,
} from './flows.actions';

export class FlowsStateModel {
  public flows: Flow[];
  public currentFlow: Flow;
  public isFetching: boolean;
}

@State<FlowsStateModel>({
  name: 'flowTechno',
  defaults: {
    flows: [],
    currentFlow: undefined,
    isFetching: false,
  },
})
export class ApiConfigState {
  constructor(private readonly flowsService: FlowsService) {}

  @Action(FetchAllFlowsRequest)
  fetchAllFlowTechnosRequest(
    ctx: StateContext<FlowsStateModel>,
    {  }: FetchAllFlowsRequest,
  ) {
    return this.flowsService.getAll().pipe(
      flatMap(data => ctx.dispatch(new FetchAllFlowsSuccess(data))),
      catchError(err => ctx.dispatch(new FetchAllFlowsError(err))),
    );
  }

  @Action(FetchAllFlowsSuccess)
  fetchAllFlowTechnoSuccess(
    ctx: StateContext<FlowsStateModel>,
    { flows }: FetchAllFlowsSuccess,
  ) {
    ctx.patchState({ flows });
  }

  @Action(FetchOneFlowRequest)
  fetchOneFlowTechnoRequest(
    ctx: StateContext<FlowsStateModel>,
    { id }: FetchOneFlowRequest,
  ) {
    return this.flowsService.getOne(id).pipe(
      flatMap(data => ctx.dispatch(new FetchOneFlowSuccess(data))),
      catchError(err => ctx.dispatch(new FetchOneFlowError(err))),
    );
  }

  @Action(FetchOneFlowSuccess)
  fetchOneFlowTechnoSuccess(
    ctx: StateContext<FlowsStateModel>,
    { currentFlow }: FetchOneFlowSuccess,
  ) {
    ctx.patchState({ currentFlow });
  }
}

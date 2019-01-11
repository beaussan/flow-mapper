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
  UpdateFlowTechnoRequest,
  UpdateFlowTechnoSuccess,
  UpdateFlowTechnoError,
  DeleteFlowTechnoRequest,
  DeleteFlowTechnoSuccess,
  DeleteFlowTechnoError,
  CreateFlowTechnoRequest,
  CreateFlowTechnoSuccess,
  CreateFlowTechnoError,
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

  @Action(UpdateFlowTechnoRequest)
  updateFlowTechnoRequest(
    ctx: StateContext<FlowTechnosStateModel>,
    { id, name }: UpdateFlowTechnoRequest,
  ) {
    return this.flowTechnoService.updateFlowTechno(id, name).pipe(
      flatMap(data => ctx.dispatch(new UpdateFlowTechnoSuccess(data))),
      catchError(err => ctx.dispatch(new UpdateFlowTechnoError(err))),
    );
  }

  @Action(UpdateFlowTechnoSuccess)
  updateFlowTechnoSuccess(
    ctx: StateContext<FlowTechnosStateModel>,
    { flowTechno }: UpdateFlowTechnoSuccess,
  ) {
    ctx.patchState({
      flowTechnos: ctx.getState().flowTechnos.map(f => {
        if (f.id === flowTechno.id) {
          f.name = flowTechno.name;
        }
        return f;
      }),
    });
  }

  @Action(DeleteFlowTechnoRequest)
  deleteFlowTechnoRequest(
    ctx: StateContext<FlowTechnosStateModel>,
    { id }: DeleteFlowTechnoRequest,
  ) {
    return this.flowTechnoService.deleteFlowTechno(id).pipe(
      flatMap(() => ctx.dispatch(new DeleteFlowTechnoSuccess(id))),
      catchError(err => ctx.dispatch(new DeleteFlowTechnoError(err))),
    );
  }

  @Action(DeleteFlowTechnoSuccess)
  deleteFlowTechnoSuccess(
    ctx: StateContext<FlowTechnosStateModel>,
    { id }: DeleteFlowTechnoSuccess,
  ) {
    ctx.patchState({
      flowTechnos: ctx.getState().flowTechnos.filter(f => f.id !== id),
    });
  }

  @Action(CreateFlowTechnoRequest)
  createFlowTechnoRequest(
    ctx: StateContext<FlowTechnosStateModel>,
    { name }: CreateFlowTechnoRequest,
  ) {
    return this.flowTechnoService.addFlowTechno(name).pipe(
      flatMap(flowTechno =>
        ctx.dispatch(new CreateFlowTechnoSuccess(flowTechno)),
      ),
      catchError(err => ctx.dispatch(new CreateFlowTechnoError(err))),
    );
  }

  @Action(CreateFlowTechnoSuccess)
  createFlowTechnoSuccess(
    ctx: StateContext<FlowTechnosStateModel>,
    { flowTechno }: CreateFlowTechnoSuccess,
  ) {
    ctx.patchState({
      flowTechnos: [...ctx.getState().flowTechnos, flowTechno],
    });
  }
}

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
  DeleteFlowRequest,
  DeleteFlowSuccess,
  DeleteFlowError,
  UpdateFlowRequest,
  UpdateFlowSuccess,
  UpdateFlowError,
  CreateFlowRequest,
  CreateFlowSuccess,
  CreateFlowError,
} from './flows.actions';

export class FlowsStateModel {
  public flows: Flow[];
  public currentFlow: Flow;
  public isFetching: boolean;
}

const colorArray = [
  '#ffb3ba',
  '#ffdfba',
  '#ffffba',
  '#baffc9',
  '#bae1ff',
  '#E0BBE4',
  '#957DAD',
  '#D291BC',
  '#FEC8D8',
  '#FFDFD3',
];

@State<FlowsStateModel>({
  name: 'Flow',
  defaults: {
    flows: [],
    currentFlow: undefined,
    isFetching: false,
  },
})
export class FlowState {
  @Selector()
  static flows(state: FlowsStateModel): Flow[] {
    return state.flows;
  }

  @Selector()
  static formattedFlowsForGrah(state: FlowsStateModel): any {
    const finalvALUE = state.flows
      .map(flow => {
        const { sourceApp, destinationApp, flowTechnos } = flow;

        if (sourceApp === null || destinationApp === null) {
          return undefined;
        }

        const sourceToMapping = {
          id: `app-${sourceApp.id}`,
          label: sourceApp.name,
          color: colorArray[sourceApp.id % colorArray.length],
        };
        const destToMapping = {
          id: `app-${destinationApp.id}`,
          label: destinationApp.name,
          color: colorArray[destinationApp.id % colorArray.length],
        };
        const flowMapped = flowTechnos.map((item, index) => ({
          id: `flow-${sourceApp.id}-${destinationApp.id}-${item.id}-${index}`,
          label: item.name,
          color: colorArray[item.id % colorArray.length],
        }));
        const arrFull = [sourceToMapping, ...flowMapped, destToMapping];

        const outFinal = arrFull
          .map((item, idx, arr) => {
            if (idx === arr.length - 1) {
              // we ignre the last item
              return undefined;
            }
            return {
              source: item.id,
              target: arr[idx + 1].id,
            };
          })
          .filter(val => !!val);

        return {
          nodes: arrFull,
          links: outFinal,
        };
      })
      .filter(val => !!val);

    const reduced = finalvALUE.reduce(
      (acc, current) => {
        return {
          nodes: [...acc.nodes, ...current.nodes],
          links: [...acc.links, ...current.links],
        };
      },
      { nodes: [], links: [] },
    );

    return {
      links: reduced.links,
      nodes: reduced.nodes.filter(
        (val, id, arr) => id === arr.findIndex(value => value.id === val.id),
      ),
    };
  }

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
  fetchAllFlowSuccess(
    ctx: StateContext<FlowsStateModel>,
    { flows }: FetchAllFlowsSuccess,
  ) {
    ctx.patchState({ flows });
  }

  @Action(FetchOneFlowRequest)
  fetchOneFlowRequest(
    ctx: StateContext<FlowsStateModel>,
    { id }: FetchOneFlowRequest,
  ) {
    return this.flowsService.getOne(id).pipe(
      flatMap(data => ctx.dispatch(new FetchOneFlowSuccess(data))),
      catchError(err => ctx.dispatch(new FetchOneFlowError(err))),
    );
  }

  @Action(FetchOneFlowSuccess)
  fetchOneFlowSuccess(
    ctx: StateContext<FlowsStateModel>,
    { currentFlow }: FetchOneFlowSuccess,
  ) {
    ctx.patchState({ currentFlow });
  }

  @Action(DeleteFlowRequest)
  deleteFlowRequest(
    ctx: StateContext<FlowsStateModel>,
    { id }: DeleteFlowRequest,
  ) {
    return this.flowsService.delete(id).pipe(
      flatMap(() => ctx.dispatch(new DeleteFlowSuccess(id))),
      catchError(err => ctx.dispatch(new DeleteFlowError(err))),
    );
  }

  @Action(DeleteFlowSuccess)
  deleteFlowSuccess(
    ctx: StateContext<FlowsStateModel>,
    { id }: DeleteFlowRequest,
  ) {
    ctx.patchState({
      flows: ctx.getState().flows.filter(f => f.id !== id),
    });
  }

  @Action(UpdateFlowRequest)
  updateFlowRequest(
    ctx: StateContext<FlowsStateModel>,
    {
      id,
      name,
      description,
      destinationAppId,
      sourceAppId,
      flowTechnos,
    }: UpdateFlowRequest,
  ) {
    return this.flowsService
      .update(id, name, description, sourceAppId, destinationAppId, flowTechnos)
      .pipe(
        flatMap(flow => ctx.dispatch(new UpdateFlowSuccess(flow))),
        catchError(err => ctx.dispatch(new UpdateFlowError(err))),
      );
  }

  @Action(UpdateFlowSuccess)
  updateFlowSuccess(
    ctx: StateContext<FlowsStateModel>,
    { flow }: UpdateFlowSuccess,
  ) {
    ctx.patchState({
      flows: ctx.getState().flows.map(f => {
        if (f.id === flow.id) {
          f.name = flow.name;
          f.description = flow.description;
          f.destinationApp = flow.destinationApp;
          f.sourceApp = flow.sourceApp;
          f.flowTechnos = flow.flowTechnos;
        }
        return f;
      }),
    });
  }

  @Action(CreateFlowRequest)
  createFlowRequest(
    ctx: StateContext<FlowsStateModel>,
    {
      name,
      description,
      sourceAppId,
      destinationAppId,
      flowTechnos,
    }: CreateFlowRequest,
  ) {
    return this.flowsService
      .add(name, description, sourceAppId, destinationAppId, flowTechnos)
      .pipe(
        flatMap(flow => ctx.dispatch(new CreateFlowSuccess(flow))),
        catchError(err => ctx.dispatch(new CreateFlowError(err))),
      );
  }

  @Action(CreateFlowSuccess)
  createFlowSuccess(
    ctx: StateContext<FlowsStateModel>,
    { flow }: CreateFlowSuccess,
  ) {
    ctx.patchState({
      flows: [...ctx.getState().flows, flow],
    });
  }
}

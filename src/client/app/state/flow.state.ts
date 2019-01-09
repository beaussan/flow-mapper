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
    const uniqued = {
      links: reduced.links,
      nodes: reduced.nodes.filter(
        (val, id, arr) => id === arr.findIndex(value => value.id === val.id),
      ),
    };

    /*
    things.thing = things.thing.filter((thing, index, self) =>
  index === self.findIndex((t) => (
    t.place === thing.place && t.name === thing.name
  ))
)
     */

    return uniqued;
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
}

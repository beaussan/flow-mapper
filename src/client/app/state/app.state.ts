import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, flatMap } from 'rxjs/operators';
import { App } from '../types/app';
import {
  FetchAllAppFailure,
  FetchAllAppRequest,
  FetchAllAppSuccess,
  FetchOneAppFailure,
  FetchOneAppRequest,
  FetchOneAppSuccess,
} from './app.actions';
import { AppService } from '../services/app.service';

export class AppStateModel {
  public apps: App[];
  public currentApp: App;
  public isFetching: boolean;
}

@State<AppStateModel>({
  name: 'App',
  defaults: {
    apps: [],
    currentApp: undefined,
    isFetching: false,
  },
})
export class AppState {
  @Selector()
  static apps(state: AppStateModel): App[] {
    return state.apps;
  }
  constructor(private readonly appService: AppService) {}

  // ***** Fetch All *****
  @Action(FetchAllAppRequest)
  fetchAllAppRequest(
    ctx: StateContext<AppStateModel>,
    {  }: FetchAllAppRequest,
  ) {
    return this.appService.getAll().pipe(
      flatMap(data => ctx.dispatch(new FetchAllAppSuccess(data))),
      catchError(err => ctx.dispatch(new FetchAllAppFailure(err))),
    );
  }

  @Action(FetchAllAppSuccess)
  fetchAllAppSuccess(
    ctx: StateContext<AppStateModel>,
    { apps }: FetchAllAppSuccess,
  ) {
    ctx.patchState({ apps });
  }

  // ***** Fetch One ******
  @Action(FetchOneAppRequest)
  fetchOneAppRequest(
    ctx: StateContext<AppStateModel>,
    { id }: FetchOneAppRequest,
  ) {
    return this.appService.getOne(id).pipe(
      flatMap(data => ctx.dispatch(new FetchOneAppSuccess(data))),
      catchError(err => ctx.dispatch(new FetchOneAppFailure(err))),
    );
  }

  @Action(FetchOneAppSuccess)
  fetchOneAppSuccess(
    ctx: StateContext<AppStateModel>,
    { currentApp }: FetchOneAppSuccess,
  ) {
    ctx.patchState({ currentApp });
  }
}

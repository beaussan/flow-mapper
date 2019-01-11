import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, flatMap } from 'rxjs/operators';
import { App } from '../types/app';
import {
  CreateAppError,
  CreateAppRequest,
  CreateAppSuccess,
  DeleteAppError,
  DeleteAppRequest,
  DeleteAppSuccess,
  FetchAllAppFailure,
  FetchAllAppRequest,
  FetchAllAppSuccess,
  FetchOneAppFailure,
  FetchOneAppRequest,
  FetchOneAppSuccess,
  UpdateAppError,
  UpdateAppRequest,
  UpdateAppSuccess,
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

  // ***** Create ******
  @Action(CreateAppRequest)
  createAppRequest(
    ctx: StateContext<AppStateModel>,
    { name, description, technos }: CreateAppRequest,
  ) {
    return this.appService.addApp(name, description, technos).pipe(
      flatMap(app => ctx.dispatch(new CreateAppSuccess(app))),
      catchError(err => ctx.dispatch(new CreateAppError(err))),
    );
  }

  @Action(CreateAppSuccess)
  createAppSuccess(
    ctx: StateContext<AppStateModel>,
    { app }: CreateAppSuccess,
  ) {
    ctx.patchState({
      apps: [...ctx.getState().apps, app],
    });
  }

  // ***** Update ******
  @Action(UpdateAppRequest)
  updateAppRequest(
    ctx: StateContext<AppStateModel>,
    { id, name, description, technos }: UpdateAppRequest,
  ) {
    return this.appService.updateApp(id, name, description, technos).pipe(
      flatMap(data => ctx.dispatch(new UpdateAppSuccess(data))),
      catchError(err => ctx.dispatch(new UpdateAppError(err))),
    );
  }

  @Action(UpdateAppSuccess)
  updateAppSuccess(
    ctx: StateContext<AppStateModel>,
    { app }: UpdateAppSuccess,
  ) {
    ctx.patchState({
      apps: ctx.getState().apps.map(f => {
        if (f.id === app.id) {
          f.name = app.name;
        }
        return f;
      }),
    });
  }

  // ***** Delete ******
  @Action(DeleteAppRequest)
  deleteAppRequest(ctx: StateContext<AppStateModel>, { id }: DeleteAppRequest) {
    return this.appService.deleteApp(id).pipe(
      flatMap(() => ctx.dispatch(new DeleteAppSuccess(id))),
      catchError(err => ctx.dispatch(new DeleteAppError(err))),
    );
  }

  @Action(DeleteAppSuccess)
  deleteAppSuccess(ctx: StateContext<AppStateModel>, { id }: DeleteAppSuccess) {
    ctx.patchState({
      apps: ctx.getState().apps.filter(f => f.id !== id),
    });
  }
}

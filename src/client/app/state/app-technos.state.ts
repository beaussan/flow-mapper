import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, flatMap } from 'rxjs/operators';
import { AppTechno } from '../types/app-technos';
import {
  CreateAppTechnoError,
  CreateAppTechnoRequest,
  CreateAppTechnoSuccess,
  DeleteAppTechnoError,
  DeleteAppTechnoRequest,
  DeleteAppTechnoSuccess,
  FetchAllAppTechnoFailure,
  FetchAllAppTechnoRequest,
  FetchAllAppTechnoSuccess,
  FetchOneAppTechnoFailure,
  FetchOneAppTechnoRequest,
  FetchOneAppTechnoSuccess,
  UpdateAppTechnoError,
  UpdateAppTechnoRequest,
  UpdateAppTechnoSuccess,
} from './app-technos.actions';
import { AppTechnosService } from '../services/app-technos.service';

export class AppTechnoStateModel {
  public appTechnos: AppTechno[];
  public currentAppTechno: AppTechno;
  public isFetching: boolean;
}

@State<AppTechnoStateModel>({
  name: 'AppTechno',
  defaults: {
    appTechnos: [],
    currentAppTechno: undefined,
    isFetching: false,
  },
})
export class AppTechnosState {
  @Selector()
  static appTechnos(state: AppTechnoStateModel): AppTechno[] {
    return state.appTechnos;
  }

  constructor(private readonly appTechnoService: AppTechnosService) {}

  // ***** Fetch All *****
  @Action(FetchAllAppTechnoRequest)
  fetchAllAppTechnoRequest(
    ctx: StateContext<AppTechnoStateModel>,
    {  }: FetchAllAppTechnoRequest,
  ) {
    return this.appTechnoService.getAll().pipe(
      flatMap(data => ctx.dispatch(new FetchAllAppTechnoSuccess(data))),
      catchError(err => ctx.dispatch(new FetchAllAppTechnoFailure(err))),
    );
  }

  @Action(FetchAllAppTechnoSuccess)
  fetchAllAppTechnoSuccess(
    ctx: StateContext<AppTechnoStateModel>,
    { appTechnos }: FetchAllAppTechnoSuccess,
  ) {
    ctx.patchState({ appTechnos });
  }

  // ***** Fetch One ******
  @Action(FetchOneAppTechnoRequest)
  fetchOneAppTechnoRequest(
    ctx: StateContext<AppTechnoStateModel>,
    { id }: FetchOneAppTechnoRequest,
  ) {
    return this.appTechnoService.getOne(id).pipe(
      flatMap(data => ctx.dispatch(new FetchOneAppTechnoSuccess(data))),
      catchError(err => ctx.dispatch(new FetchOneAppTechnoFailure(err))),
    );
  }

  @Action(FetchOneAppTechnoSuccess)
  fetchOneAppTechnoSuccess(
    ctx: StateContext<AppTechnoStateModel>,
    { currentAppTechno }: FetchOneAppTechnoSuccess,
  ) {
    ctx.patchState({ currentAppTechno });
  }

  // ***** Create ******
  @Action(CreateAppTechnoRequest)
  createAppTechnoRequest(
    ctx: StateContext<AppTechnoStateModel>,
    { name }: CreateAppTechnoRequest,
  ) {
    return this.appTechnoService.addAppTechno(name).pipe(
      flatMap(appTechno => ctx.dispatch(new CreateAppTechnoSuccess(appTechno))),
      catchError(err => ctx.dispatch(new CreateAppTechnoError(err))),
    );
  }

  @Action(CreateAppTechnoSuccess)
  createAppTechnoSuccess(
    ctx: StateContext<AppTechnoStateModel>,
    { appTechno }: CreateAppTechnoSuccess,
  ) {
    ctx.patchState({
      appTechnos: [...ctx.getState().appTechnos, appTechno],
    });
  }

  // ***** Update ******
  @Action(UpdateAppTechnoRequest)
  updateAppTechnoRequest(
    ctx: StateContext<AppTechnoStateModel>,
    { id, name }: UpdateAppTechnoRequest,
  ) {
    return this.appTechnoService.updateAppTechno(id, name).pipe(
      flatMap(data => ctx.dispatch(new UpdateAppTechnoSuccess(data))),
      catchError(err => ctx.dispatch(new UpdateAppTechnoError(err))),
    );
  }

  @Action(UpdateAppTechnoSuccess)
  updateAppTechnoSuccess(
    ctx: StateContext<AppTechnoStateModel>,
    { appTechno }: UpdateAppTechnoSuccess,
  ) {
    ctx.patchState({
      appTechnos: ctx.getState().appTechnos.map(f => {
        if (f.id === appTechno.id) {
          f.name = appTechno.name;
        }
        return f;
      }),
    });
  }

  // ***** Delete ******
  @Action(DeleteAppTechnoRequest)
  deleteAppTechnoRequest(
    ctx: StateContext<AppTechnoStateModel>,
    { id }: DeleteAppTechnoRequest,
  ) {
    return this.appTechnoService.deleteAppTechno(id).pipe(
      flatMap(() => ctx.dispatch(new DeleteAppTechnoSuccess(id))),
      catchError(err => ctx.dispatch(new DeleteAppTechnoError(err))),
    );
  }

  @Action(DeleteAppTechnoSuccess)
  deleteAppTechnoSuccess(
    ctx: StateContext<AppTechnoStateModel>,
    { id }: DeleteAppTechnoSuccess,
  ) {
    ctx.patchState({
      flowTechnos: ctx.getState().appTechnos.filter(f => f.id !== id),
    });
  }
}

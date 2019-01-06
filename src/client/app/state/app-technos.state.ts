import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, flatMap } from 'rxjs/operators';
import { AppTechno } from '../types/app-technos';
import {
  FetchAllAppTechnoFailure,
  FetchAllAppTechnoRequest,
  FetchAllAppTechnoSuccess,
  FetchOneAppTechnoFailure,
  FetchOneAppTechnoRequest,
  FetchOneAppTechnoSuccess,
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
    { currentAppTechno }: FetchAllAppTechnoSuccess,
  ) {
    ctx.patchState({ currentAppTechno });
  }
}

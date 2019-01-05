import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  ApiConfigFailure,
  ApiConfigRequest,
  ApiConfigSuccess,
} from './api-config.actions';
import { ApiConfigService } from '../services/api-config.service';
import { ApiConfig } from '../types/api-config';
import { catchError, flatMap } from 'rxjs/operators';
import { FuseConfigService } from '../../@fuse/services/config.service';
import { TryLoginWithToken } from './auth.actions';

export class ApiConfigStateModel {
  public config: ApiConfig;
}

@State<ApiConfigStateModel>({
  name: 'apiConfig',
  defaults: {
    config: undefined,
  },
})
export class ApiConfigState {
  @Selector()
  static isReady(state: ApiConfigStateModel): boolean {
    return state.config !== undefined;
  }

  @Selector()
  static isAuthEnabled(state: ApiConfigStateModel): boolean {
    return state.config.isAuthEnabled;
  }

  @Selector()
  static isLocalRegisterEnabled(state: ApiConfigStateModel): boolean {
    return state.config.isLocalRegisterEnabled;
  }

  @Selector()
  static isGoogleAuthEnabled(state: ApiConfigStateModel): boolean {
    return state.config.isGoogleAuthEnabled;
  }

  @Selector()
  static isTwitterAuthEnabled(state: ApiConfigStateModel): boolean {
    return state.config.isTwitterAuthEnabled;
  }

  @Selector()
  static isFacebookAuthEnabled(state: ApiConfigStateModel): boolean {
    return state.config.isFacebookAuthEnabled;
  }

  constructor(
    private readonly apiConfigService: ApiConfigService,
    private readonly fuseConfigService: FuseConfigService,
  ) {}

  @Action(ApiConfigRequest)
  apiConfigRequest(
    ctx: StateContext<ApiConfigStateModel>,
    {  }: ApiConfigRequest,
  ) {
    return this.apiConfigService.getConfig().pipe(
      flatMap(data => ctx.dispatch(new ApiConfigSuccess(data))),
      catchError(err => ctx.dispatch(new ApiConfigFailure(err))),
    );
  }

  @Action(ApiConfigSuccess)
  apiConfigSuccess(
    ctx: StateContext<ApiConfigStateModel>,
    { config }: ApiConfigSuccess,
  ) {
    ctx.patchState({ config });

    if (config.isAuthEnabled) {
      this.fuseConfigService.config = {
        layout: {
          navbar: {
            variant: 'vertical-style-1',
          },
        },
      };
      ctx.dispatch(new TryLoginWithToken());
    } else {
      this.fuseConfigService.config = {
        layout: {
          navbar: {
            variant: 'vertical-style-2',
          },
        },
      };
    }
  }
}

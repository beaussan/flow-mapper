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

export class ApiConfigStateModel {
  public apiConfig: ApiConfig;
}

@State<ApiConfigStateModel>({
  name: 'apiConfig',
  defaults: {
    apiConfig: undefined,
  },
})
export class ApiConfigState {
  @Selector()
  static isReady(state: ApiConfigStateModel): boolean {
    return state.apiConfig !== undefined;
  }

  @Selector()
  static isAuthEnabled(state: ApiConfigStateModel): boolean {
    return state.apiConfig.isAuthEnabled;
  }

  @Selector()
  static isLocalRegisterEnabled(state: ApiConfigStateModel): boolean {
    return state.apiConfig.isLocalRegisterEnabled;
  }

  @Selector()
  static isGoogleAuthEnabled(state: ApiConfigStateModel): boolean {
    return state.apiConfig.isGoogleAuthEnabled;
  }

  @Selector()
  static isTwitterAuthEnabled(state: ApiConfigStateModel): boolean {
    return state.apiConfig.isTwitterAuthEnabled;
  }

  @Selector()
  static isFacebookAuthEnabled(state: ApiConfigStateModel): boolean {
    return state.apiConfig.isFacebookAuthEnabled;
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
    ctx.patchState({ apiConfig: config });

    if (config.isAuthEnabled) {
      this.fuseConfigService.config = {
        layout: {
          navbar: {
            variant: 'vertical-style-1',
          },
        },
      };
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

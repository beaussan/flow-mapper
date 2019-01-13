import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from '../types/auth';
import {
  AuthLoginFailure,
  AuthLoginRequest,
  AuthLoginSuccess,
  AuthRegisterRequest,
  Logout,
  SaveToken,
  TryLoginWithToken,
} from './auth.actions';
import { AuthService } from '../services/auth.service';
import { catchError, flatMap, tap } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { FuseNavigationService } from '../../@fuse/components/navigation/navigation.service';

export interface AuthStateModel {
  authToken: string;
  hasAlreadyTriedLoginOnce: boolean;
  user?: User;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    authToken: '',
    hasAlreadyTriedLoginOnce: false,
  },
})
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string {
    return state.authToken;
  }

  @Selector()
  static hasAlreadyTriedLoginOnce(state: AuthStateModel): boolean {
    return state.hasAlreadyTriedLoginOnce;
  }

  @Selector()
  static isUserConnected(state: AuthStateModel): boolean {
    return !!state.user;
  }

  @Selector()
  static userName(state: AuthStateModel): string {
    if (!state.user) {
      return '';
    }
    return state.user.name;
  }

  @Selector()
  static userId(state: AuthStateModel): number {
    if (!state.user) {
      return 0;
    }
    return state.user.id;
  }

  @Selector()
  static userEmail(state: AuthStateModel): string {
    if (!state.user) {
      return '';
    }
    return state.user.localEmail;
  }

  @Selector()
  static userPicture(state: AuthStateModel): string {
    return `https://api.adorable.io/avatars/250/${state.user.id * 3}`;
  }

  @Selector()
  static isSuperUser(state: AuthStateModel): boolean {
    if (!state.user) {
      return false;
    }
    return state.user.isSuperUser;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly navService: FuseNavigationService,
  ) {}

  @Action(AuthLoginRequest)
  loginRequest(
    ctx: StateContext<AuthStateModel>,
    { email, password }: AuthLoginRequest,
  ) {
    return this.authService.loginUser(email, password).pipe(
      flatMap(token => ctx.dispatch(new SaveToken(token.token))),
      flatMap(() => this.authService.getMe()),
      tap(() => ctx.patchState({ hasAlreadyTriedLoginOnce: true })),
      flatMap(user => ctx.dispatch(new AuthLoginSuccess(user))),
      flatMap(() => ctx.dispatch(new Navigate(['/']))),
      catchError(err => ctx.dispatch(new AuthLoginFailure(err))),
    );
  }

  @Action(AuthRegisterRequest)
  registerUserRequest(
    ctx: StateContext<AuthStateModel>,
    { email, name, password }: AuthRegisterRequest,
  ) {
    return this.authService.registerUser(email, password, name).pipe(
      flatMap(token => ctx.dispatch(new SaveToken(token.token))),
      flatMap(() => this.authService.getMe()),
      tap(() => ctx.patchState({ hasAlreadyTriedLoginOnce: true })),
      flatMap(user => ctx.dispatch(new AuthLoginSuccess(user))),
      flatMap(() => ctx.dispatch(new Navigate(['/']))),
      catchError(err => ctx.dispatch(new AuthLoginFailure(err))),
    );
  }

  @Action(TryLoginWithToken)
  tryLogging(ctx: StateContext<AuthStateModel>) {
    const token = AuthState.token(ctx.getState());
    if (!token) {
      ctx.patchState({ hasAlreadyTriedLoginOnce: true });
      return;
    }

    return this.authService.getMe().pipe(
      flatMap(user => ctx.dispatch(new AuthLoginSuccess(user))),
      catchError(err => ctx.dispatch(new AuthLoginFailure(err))),
      tap(() => ctx.patchState({ hasAlreadyTriedLoginOnce: true })),
    );
  }

  @Action(Logout)
  logoutUser(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ authToken: '', user: undefined });
    ctx.dispatch(new Navigate(['/auth/login']));
    this.navService.updateNavigationItem('admin', {
      hidden: true,
    });
  }

  @Action(SaveToken)
  saveToken(ctx: StateContext<AuthStateModel>, { token }: SaveToken) {
    ctx.patchState({ authToken: token });
  }

  @Action(AuthLoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, { user }: AuthLoginSuccess) {
    ctx.patchState({ user });
    if (user.isSuperUser) {
      this.navService.updateNavigationItem('admin', {
        hidden: false,
      });
    } else {
      this.navService.updateNavigationItem('admin', {
        hidden: true,
      });
    }
  }

  @Action(AuthLoginFailure)
  loginFailure(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ authToken: '', user: undefined });
    this.navService.updateNavigationItem('admin', {
      hidden: true,
    });
  }
}

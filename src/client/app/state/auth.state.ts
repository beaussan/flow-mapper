import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from '../types/auth';
import {
  AuthLoginFailure,
  AuthLoginRequest,
  AuthLoginSuccess,
  SaveToken,
} from './auth.actions';
import { AuthService } from '../services/auth.service';
import { catchError, flatMap } from 'rxjs/operators';

export interface AuthStateModel {
  authToken: string;
  user?: User;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    authToken: '',
  },
})
export class AuthState {

  @Selector()
  static token(state: AuthStateModel): string {
    return state.authToken;
  }

  constructor(private readonly authService: AuthService) {}

  @Action(AuthLoginRequest)
  loginRequest(
    ctx: StateContext<AuthStateModel>,
    { email, password }: AuthLoginRequest,
  ) {
    return this.authService.loginUser(email, password).pipe(
      flatMap(token => ctx.dispatch(new SaveToken(token.token))),
      flatMap(() => this.authService.getMe()),
      flatMap(user => ctx.dispatch(new AuthLoginSuccess(user))),
      catchError(err => ctx.dispatch(new AuthLoginFailure(err))),
    );
  }

  @Action(SaveToken)
  saveToken(ctx: StateContext<AuthStateModel>, { token }: SaveToken) {
    ctx.patchState({ authToken: token });
  }

  @Action(AuthLoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, { user }: AuthLoginSuccess) {
    ctx.patchState({ user });
  }
}

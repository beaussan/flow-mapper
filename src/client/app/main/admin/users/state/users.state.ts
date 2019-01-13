import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from '../../../../types/auth';
import {
  CreateUser,
  DemoteUser,
  PromoteUser,
  SetUserRoles,
  UserAllFailure,
  UserAllRequest,
  UserAllSuccess,
} from './users.actions';
import { UsersService } from '../services/users.service';
import { catchError, flatMap } from 'rxjs/operators';

export interface UsersStateModel {
  users: User[];
}

@State<UsersStateModel>({
  name: 'user',
  defaults: {
    users: undefined,
  },
})
export class UsersState {
  @Selector()
  static users(state: UsersStateModel): User[] {
    return state.users;
  }

  constructor(private readonly userService: UsersService) {}

  @Action(UserAllRequest)
  getAllUsers(ctx: StateContext<UsersStateModel>, {  }: UserAllRequest) {
    return this.userService.getAll().pipe(
      flatMap(val => ctx.dispatch(new UserAllSuccess(val))),
      catchError(err => ctx.dispatch(new UserAllFailure(err))),
    );
  }

  @Action(UserAllSuccess)
  getAllSuccess(ctx: StateContext<UsersStateModel>, { user }: UserAllSuccess) {
    ctx.patchState({ users: user });
  }

  @Action(PromoteUser)
  promoteUser(ctx: StateContext<UsersStateModel>, { userId }: PromoteUser) {
    return this.userService
      .promoteUser(userId)
      .pipe(flatMap(() => ctx.dispatch(new UserAllRequest())));
  }

  @Action(DemoteUser)
  demoteUser(ctx: StateContext<UsersStateModel>, { userId }: DemoteUser) {
    return this.userService
      .demoteUser(userId)
      .pipe(flatMap(() => ctx.dispatch(new UserAllRequest())));
  }

  @Action(SetUserRoles)
  setRolesUser(
    ctx: StateContext<UsersStateModel>,
    { userId, roles }: SetUserRoles,
  ) {
    return this.userService
      .setUserRoles(userId, roles)
      .pipe(flatMap(() => ctx.dispatch(new UserAllRequest())));
  }

  @Action(CreateUser)
  createUser(ctx: StateContext<UsersStateModel>, { user }: CreateUser) {
    return this.userService
      .createUser(user)
      .pipe(flatMap(() => ctx.dispatch(new UserAllRequest())));
  }
}

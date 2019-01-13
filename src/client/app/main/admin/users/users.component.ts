import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UsersState } from './state/users.state';
import { Observable } from 'rxjs';
import { User } from '../../../types/auth';
import {
  DemoteUser,
  PromoteUser,
  SetUserRoles,
  UserAllRequest,
} from './state/users.actions';
import { AuthState } from '../../../state/auth.state';
import { MatCheckboxChange, MatDialog } from '@angular/material';
import { UserCreateModalComponent } from './user-create-modal/user-create-modal.component';

@Component({
  selector: 'fl-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @Select(UsersState.users)
  users$: Observable<User[]>;

  @Select(AuthState.userId)
  currentUserId$: Observable<number>;

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'roleUser',
    'roleEditFlow',
    'roleEditApps',
    'isAdmin',
  ];

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog,
  ) {
    this.store.dispatch(new UserAllRequest());
  }

  ngOnInit() {}

  openNewUserDialog() {
    this.dialog.open(UserCreateModalComponent, {});
  }

  isUserRoleUser(user: User) {
    return this.findRole(user, 'ROLE_USER');
  }

  isUserRoleEditFlow(user: User) {
    return this.findRole(user, 'ROLE_EDIT_FLOW');
  }

  isUserRoleEditApps(user: User) {
    return this.findRole(user, 'ROLE_EDIT_APPS');
  }

  findRole(user: User, key: string): boolean {
    return !!user.roles.find(val => val.key === key);
  }

  toggleSuperUser(userId: number, event: MatCheckboxChange): void {
    // event.checked is the new state
    if (event.checked) {
      this.store.dispatch(new PromoteUser(userId));
    } else {
      this.store.dispatch(new DemoteUser(userId));
    }
  }

  toggleUserRole(keyRole: string, user: User, event: MatCheckboxChange): void {
    let roles = user.roles.map(val => val.key);

    if (event.checked) {
      roles = [...roles, keyRole];
    } else {
      roles = roles.filter(val => val !== keyRole);
    }

    this.store.dispatch(new SetUserRoles(user.id, roles));
  }
}

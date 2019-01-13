import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { ApiConfigState } from '../state/api-config.state';
import { filter, flatMap, tap } from 'rxjs/operators';
import { AuthState } from '../state/auth.state';
import { Navigate } from '@ngxs/router-plugin';

export class SuperuserGuard implements CanActivate, CanActivateChild {
  constructor(private readonly store: Store) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(ApiConfigState.isReady).pipe(
      filter(val => val),
      flatMap(() => this.store.select(ApiConfigState.isAuthEnabled)),
      flatMap(isAuthEnabled => {
        if (!isAuthEnabled) {
          return of(false);
        }
        return this.store.select(AuthState.hasAlreadyTriedLoginOnce).pipe(
          filter(val => val),
          flatMap(() => this.store.select(AuthState.isUserConnected)),
          filter(val => val),
          flatMap(() => this.store.select(AuthState.isSuperUser)),
        );
      }),
      tap(val => {
        if (!val) {
          this.store.dispatch(new Navigate(['/']));
        }
      }),
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}

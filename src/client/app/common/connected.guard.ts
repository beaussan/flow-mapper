import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { ApiConfigState } from '../state/api-config.state';
import { filter, flatMap, tap } from 'rxjs/operators';
import { AuthState } from '../state/auth.state';
import { Navigate } from '@ngxs/router-plugin';

@Injectable({
  providedIn: 'root',
})
export class ConnectedGuard implements CanActivate, CanActivateChild {
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
          return of(true);
        }
        return this.store.select(AuthState.hasAlreadyTriedLoginOnce).pipe(
          filter(val => val),
          flatMap(() => this.store.select(AuthState.isUserConnected)),
        );
      }),
      tap(val => {
        if (!val) {
          this.store.dispatch(new Navigate(['/auth/login']));
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

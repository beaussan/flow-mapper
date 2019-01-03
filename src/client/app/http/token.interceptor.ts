import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngxs/store';
import { ApiConfigState } from '../state/api-config.state';
import { AuthState } from '../state/auth.state';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const isAuthEnabled = this.store.selectSnapshot(
      ApiConfigState.isAuthEnabled,
    );
    if (!isAuthEnabled) {
      return next.handle(request);
    }
    const token = this.store.selectSnapshot(AuthState.token);

    const newRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(newRequest);
  }
}

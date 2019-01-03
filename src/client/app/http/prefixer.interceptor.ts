import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngxs/store';
import { ApiConfigState } from '../state/api-config.state';
import { AuthState } from '../state/auth.state';
import { environment } from '../../environments/environment';

@Injectable()
export class PrefixerInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url && request.url.startsWith('http')) {
      return next.handle(request);
    }
    if (request.url && request.url.startsWith('assets')) {
      return next.handle(request);
    }
    const newRequest = request.clone({ url: environment.apiUrl + request.url });
    return next.handle(newRequest);

  }
}
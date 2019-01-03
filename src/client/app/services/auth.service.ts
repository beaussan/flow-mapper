import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Token, User } from '../types/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  getToken(): Observable<Token> {
    return this.httpClient.get<Token>('/auth/local/login');
  }

  loginUser(email: string, password: string): Observable<Token> {
    return this.httpClient.post<Token>('/auth/local/login', {
      email,
      password,
    });
  }

  getMe(): Observable<User> {
    return this.httpClient.get<User>('/auth/authorized');
  }
}

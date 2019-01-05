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

  loginUser(email: string, password: string): Observable<Token> {
    return this.httpClient.post<Token>('/auth/local/login', {
      email,
      password,
    });
  }

  registerUser(
    email: string,
    password: string,
    name: string,
  ): Observable<Token> {
    return this.httpClient.post<Token>('/auth/local/register', {
      email,
      name,
      password,
    });
  }

  getMe(): Observable<User> {
    return this.httpClient.get<User>('/auth/authorized');
  }
}

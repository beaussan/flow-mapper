import { Injectable } from '@angular/core';
import { UsersModule } from '../users.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../../types/auth';
import { UserCreation } from '../types/userCreation';

@Injectable({
  providedIn: UsersModule,
})
export class UsersService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>('/users');
  }

  promoteUser(userId: number): Observable<void> {
    return this.httpClient.post<void>(`/users/${userId}/promote`, null);
  }

  demoteUser(userId: number): Observable<void> {
    return this.httpClient.post<void>(`/users/${userId}/demote`, null);
  }

  setUserRoles(userId: number, roles: string[]): Observable<void> {
    return this.httpClient.post<void>(`/users/${userId}/roles`, { roles });
  }

  createUser(user: UserCreation): Observable<void> {
    return this.httpClient.post<void>(`/users`, user);
  }
}

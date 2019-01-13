import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { App } from '../types/app';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Observable<App[]> {
    return this.httpClient.get<App[]>('/apps');
  }

  getOne(id: number): Observable<App> {
    return this.httpClient.get<App>(`/apps/${id}`);
  }

  addApp(
    name: string,
    description: string,
    technos: string[],
  ): Observable<App> {
    return this.httpClient.post<App>('/apps', {
      name,
      description,
      technos,
    });
  }

  updateApp(
    id: number,
    name: string,
    description: string,
    technos: string[],
  ): Observable<App> {
    return this.httpClient.put<App>(`/apps/${id}`, {
      name,
      description,
      technos,
    });
  }

  deleteApp(id: number): Observable<App> {
    return this.httpClient.delete<App>(`/apps/${id}`);
  }
}

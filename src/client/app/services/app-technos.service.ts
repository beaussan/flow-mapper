import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppTechno } from '../types/app-technos';

@Injectable({
  providedIn: 'root',
})
export class AppTechnosService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Observable<AppTechno[]> {
    return this.httpClient.get<AppTechno[]>('/app-technos');
  }

  getOne(id: number): Observable<AppTechno> {
    return this.httpClient.get<AppTechno>(`/app-technos/${id}`);
  }

  addAppTechno(name: string): Observable<AppTechno> {
    return this.httpClient.post<AppTechno>('/app-technos', {
      name,
    });
  }

  updateAppTechno(id: number, name: string): Observable<AppTechno> {
    return this.httpClient.put<AppTechno>(`/app-technos/${id}`, {
      name,
    });
  }

  deleteAppTechno(id: number): Observable<void> {
    return this.httpClient.delete<void>(`/app-technos/${id}`);
  }
}

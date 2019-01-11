import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flow } from '../types/flow';

@Injectable({
  providedIn: 'root',
})
export class FlowsService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Observable<Flow[]> {
    return this.httpClient.get<Flow[]>('/flow');
  }

  getOne(id: number): Observable<Flow> {
    return this.httpClient.get<Flow>(`/flow/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`/flow/${id}`);
  }

  update(
    id: number,
    name: string,
    description: string,
    sourceAppId: number,
    destinationAppId: number,
    flowTechnos: string[],
  ): Observable<Flow> {
    return this.httpClient.put<Flow>(`/flow/${id}`, {
      name,
      description,
      sourceAppId,
      destinationAppId,
      flowTechnos,
    });
  }

  add(
    name: string,
    description: string,
    sourceAppId: number,
    destinationAppId: number,
    flowTechnos: string[],
  ): Observable<Flow> {
    return this.httpClient.post<Flow>('/flow', {
      name,
      description,
      sourceAppId,
      destinationAppId,
      flowTechnos,
    });
  }
}

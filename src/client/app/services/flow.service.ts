import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Token, User } from '../types/auth';
import { FlowTechno } from '../types/flow-technos';
import { Flow } from '../types/flow';

@Injectable({
  providedIn: 'root',
})
export class FlowsService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Observable<Flow[]> {
    return this.httpClient.get<Flow[]>('/flows');
  }

  getOne(id: number): Observable<Flow> {
    return this.httpClient.get<Flow>(`/flows/${id}`);
  }

  addFlow(
    name: string,
    description: string,
    sourceAppId: number,
    destinationAppId: number,
    flowTechnos: string[],
  ): Observable<Flow> {
    return this.httpClient.post<Flow>('/flows', {
      name,
      description,
      sourceAppId,
      destinationAppId,
      flowTechnos,
    });
  }
}

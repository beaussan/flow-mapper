import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Token, User } from '../types/auth';
import { FlowTechno } from '../types/flow-technos';

@Injectable({
  providedIn: 'root',
})
export class FlowTechnosService {
  constructor(private readonly httpClient: HttpClient) {}

  getAll(): Observable<FlowTechno[]> {
    return this.httpClient.get<FlowTechno[]>('/flow-technos');
  }

  getOne(id: number): Observable<FlowTechno> {
    return this.httpClient.get<FlowTechno>(`/flow-technos/${id}`);
  }

  addFlowTechno(name: string): Observable<FlowTechno> {
    return this.httpClient.post<FlowTechno>('/flow-technos', {
      name,
    });
  }

  updateFlowTechno(id: number, name: string): Observable<FlowTechno> {
    return this.httpClient.put<FlowTechno>(`/flow-technos/${id}`, {
      name,
    });
  }

  deleteFlowTechno(id: number): Observable<void> {
    return this.httpClient.delete<void>(`/flow-technos/${id}`);
  }
}

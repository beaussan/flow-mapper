import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '../types/api-config';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  constructor(private readonly httpClient: HttpClient) {}

  getConfig(): Observable<ApiConfig> {
    return this.httpClient.get<ApiConfig>(environment.apiUrl + '/config');
  }
}

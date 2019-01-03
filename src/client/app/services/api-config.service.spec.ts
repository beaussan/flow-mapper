import { TestBed } from '@angular/core/testing';

import { ApiConfigService } from './api-config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiConfigService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }),
  );

  it('should be created', () => {
    const service: ApiConfigService = TestBed.get(ApiConfigService);
    expect(service).toBeTruthy();
  });
});

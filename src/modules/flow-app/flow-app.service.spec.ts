import { Test, TestingModule } from '@nestjs/testing';
import { FlowAppService } from './flow-app.service';
import { FlowAppRepository } from './flow-app.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SEARCH_CLIENT_PROVIDER } from '../core/search/search.constants';
import { AppTechnoService } from '../app-techno/app-techno.service';

class MockService {}

class FakeSearchRepo {
  initIndex = jest.fn();
}

class FakeAppTechnoService {}

describe('FlowAppService', () => {
  let service: FlowAppService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(FlowAppRepository),
          useClass: MockService,
        },
        {
          provide: SEARCH_CLIENT_PROVIDER,
          useClass: FakeSearchRepo,
        },
        {
          provide: AppTechnoService,
          useClass: FakeAppTechnoService,
        },
        FlowAppService,
      ],
    }).compile();
    service = module.get<FlowAppService>(FlowAppService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

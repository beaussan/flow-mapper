import { Test, TestingModule } from '@nestjs/testing';
import { AppTechnoService } from './app-techno.service';
import { AppTechnoRepository } from './app-techno.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SEARCH_CLIENT_PROVIDER } from '../core/search/search.constants';

class FakeAppTechnoRepository {
  findOneWithNameIgnoringCase = jest.fn();

  findOneById = jest.fn();
}

class FakeSearchRepo {
  initIndex = jest.fn();
}

describe('AppTechnoService', () => {
  let service: AppTechnoService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppTechnoService,
        {
          provide: getRepositoryToken(AppTechnoRepository),
          useClass: FakeAppTechnoRepository,
        },
        {
          provide: SEARCH_CLIENT_PROVIDER,
          useClass: FakeSearchRepo,
        },
      ],
    }).compile();
    service = module.get<AppTechnoService>(AppTechnoService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

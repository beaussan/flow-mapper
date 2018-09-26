import { Test, TestingModule } from '@nestjs/testing';
import { AppTechnoService } from './app-techno.service';

class FakeAppTechnoRepository {
  findOneWithNameIgnoringCase = jest.fn();

  findOneById = jest.fn();
}

describe('AppTechnoService', () => {
  let service: AppTechnoService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppTechnoService,
        {
          provide: AppTechnoService,
          useClass: FakeAppTechnoRepository,
        },
      ],
    }).compile();
    service = module.get<AppTechnoService>(AppTechnoService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

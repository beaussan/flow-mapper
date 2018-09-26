import { Test, TestingModule } from '@nestjs/testing';
import { AppTechnoService } from './app-techno.service';

describe('AppTechnoService', () => {
  let service: AppTechnoService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppTechnoService],
    }).compile();
    service = module.get<AppTechnoService>(AppTechnoService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

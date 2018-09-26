import { Test, TestingModule } from '@nestjs/testing';
import { AppTechnoController } from './app-techno.controller';
import { AppTechnoService } from './app-techno.service';

class MockService {}

describe('AppTechno Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AppTechnoController],
      providers: [
        {
          provide: AppTechnoService,
          useClass: MockService,
        },
      ],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AppTechnoController = module.get<AppTechnoController>(
      AppTechnoController,
    );
    expect(controller).toBeDefined();
  });
});

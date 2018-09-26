import { Test, TestingModule } from '@nestjs/testing';
import { AppTechnoController } from './app-techno.controller';

describe('AppTechno Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AppTechnoController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AppTechnoController = module.get<AppTechnoController>(
      AppTechnoController,
    );
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FlowAppController } from './flow-app.controller';
import { FlowAppService } from './flow-app.service';

class MockService {}

describe('FlowApp Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [FlowAppController],
      providers: [
        {
          provide: FlowAppService,
          useClass: MockService,
        },
      ],
    }).compile();
  });
  it('should be defined', () => {
    const controller: FlowAppController = module.get<FlowAppController>(
      FlowAppController,
    );
    expect(controller).toBeDefined();
  });
});

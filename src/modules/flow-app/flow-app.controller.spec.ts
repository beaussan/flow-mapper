import { Test, TestingModule } from '@nestjs/testing';
import { FlowAppController } from './flow-app.controller';

describe('FlowApp Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [FlowAppController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: FlowAppController = module.get<FlowAppController>(
      FlowAppController,
    );
    expect(controller).toBeDefined();
  });
});

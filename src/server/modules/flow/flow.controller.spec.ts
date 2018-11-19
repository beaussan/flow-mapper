import { Test, TestingModule } from '@nestjs/testing';
import { FlowController } from './flow.controller';

describe('Flow Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [FlowController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: FlowController = module.get<FlowController>(
      FlowController,
    );
    expect(controller).toBeDefined();
  });
});

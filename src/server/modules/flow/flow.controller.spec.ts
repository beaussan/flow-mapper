import { Test, TestingModule } from '@nestjs/testing';
import { FlowController } from './flow.controller';
import { FlowService } from './flow.service';

class MockService {
  getAll = jest.fn();
  saveNewTechno = jest.fn();
  find = jest.fn();
  getOneById = jest.fn();
  updateName = jest.fn();
  deleteById = jest.fn();
}

describe('Flow Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [FlowController],
      providers: [
        {
          provide: FlowService,
          useClass: MockService,
        },
      ],
    }).compile();
  });
  it('should be defined', () => {
    const controller: FlowController = module.get<FlowController>(
      FlowController,
    );
    expect(controller).toBeDefined();
  });
});

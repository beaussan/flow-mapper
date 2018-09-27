import { Test, TestingModule } from '@nestjs/testing';
import { FlowAppService } from './flow-app.service';

describe('FlowAppService', () => {
  let service: FlowAppService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlowAppService],
    }).compile();
    service = module.get<FlowAppService>(FlowAppService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

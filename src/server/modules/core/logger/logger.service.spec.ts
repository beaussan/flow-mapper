import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';
import { loggerProviders } from './logger.providers';

describe('LoggerService', () => {
  let service: LoggerService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...loggerProviders, LoggerService],
    }).compile();
    service = module.get<LoggerService>(LoggerService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

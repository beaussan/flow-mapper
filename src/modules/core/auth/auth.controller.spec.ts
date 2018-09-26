import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoggerModule } from '../logger/logger.module';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [LoggerModule],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AuthController = module.get<AuthController>(
      AuthController,
    );
    expect(controller).toBeDefined();
  });
});

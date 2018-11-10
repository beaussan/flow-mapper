import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoggerModule } from '../logger/logger.module';
import { AuthService } from './auth.service';
import { UserService } from '../../user/user.service';
import { authProviders } from './auth.providers';
import { CryptoModule } from '../crypto/crypto.module';

class MockUserService {}

describe('Auth Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UserService,
          useClass: MockUserService,
        },
        ...authProviders,
      ],
      imports: [LoggerModule, CryptoModule],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AuthController = module.get<AuthController>(
      AuthController,
    );
    expect(controller).toBeDefined();
  });
});

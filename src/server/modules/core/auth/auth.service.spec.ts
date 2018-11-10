import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserModule } from '../../user/user.module';
import { UserService } from '../../user/user.service';
import { CryptoModule } from '../crypto/crypto.module';
import { authProviders } from './auth.providers';
import { LoggerModule } from '../logger/logger.module';

class MockUserService {}

describe('AuthService', () => {
  let service: AuthService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useClass: MockUserService,
        },
        ...authProviders,
      ],
      imports: [CryptoModule, LoggerModule],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

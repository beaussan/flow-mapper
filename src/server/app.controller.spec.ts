import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './modules/core/logger/logger.module';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [LoggerModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('ping', () => {
    it('should return "pong!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.root()).toBe('pong');
    });
  });
});

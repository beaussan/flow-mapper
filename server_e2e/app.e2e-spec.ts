import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { config } from 'dotenv';
// Use .env to configure environment variables (process.env) before we import others things
config();
import { AppModule } from '../src/server/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ping (GET)', () => {
    return request(app.getHttpServer())
      .get('/ping')
      .expect(200)
      .expect('pong');
  });

  it('/config (GET)', () => {
    return request(app.getHttpServer())
      .get('/config')
      .expect(200)
      .expect({
        isAuthEnabled: process.env.IS_AUTH_ENABLED === 'true',
        isFacebookAuthEnabled: process.env.FB_AUTH_ENABLED === 'true',
        isGoogleAuthEnabled: process.env.GOOGLE_AUTH_ENABLED === 'true',
        isTwitterAuthEnabled: process.env.TWITTER_AUTH_ENABLED === 'true',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './modules/core/logger/logger.module';
import { AuthModule } from './modules/core/auth/auth.module';
import { RouterModule } from 'nest-router';
import { appRoutes } from './app.routes';
import { RolesGuard } from './guards/roles.guard';
import { SearchModule } from './modules/core/search/search.module';
import { AppTechnoModule } from './modules/app-techno/app-techno.module';
import { FlowAppModule } from './modules/flow-app/flow-app.module';
import { FlowTechnoModule } from './modules/flow-techno/flow-techno.module';
import { UserModule } from './modules/user/user.module';
import { FlowModule } from './modules/flow/flow.module';
import { FlowService } from './modules/flow/flow.service';
import { Strategy as AnonymousStrategy } from 'passport-anonymous';
import * as passport from 'passport';
import { FlowAppController } from './modules/flow-app/flow-app.controller';
import { AppTechnoController } from './modules/app-techno/app-techno.controller';
import { FlowTechnoController } from './modules/flow-techno/flow-techno.controller';
import { PromModule } from './modules/core/metrics/metrics.module';

@Module({
  imports: [
    LoggerModule, // Global
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/../**/**.entity{.ts,.js}'],
      synchronize: true,
      cli: {
        migrationsDir: __dirname + '/../src/migration',
      },
      logging: 'all',
      // logging: 'all',
    }),

    PromModule.forRoot({
      defaultLabels: {
        app: 'v1.0.0',
      },
    }),

    RouterModule.forRoutes(appRoutes),

    AuthModule,

    SearchModule,

    AppTechnoModule,

    FlowAppModule,

    FlowTechnoModule,

    FlowModule,

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard, FlowService],
})
export class AppModule implements NestModule {
  constructor() {}
  configure(consumer: MiddlewareConsumer): void {
    passport.use(new AnonymousStrategy());

    consumer
      .apply(passport.authenticate(['jwt', 'anonymous'], { session: false }))
      .forRoutes(
        AppTechnoController,
        FlowAppController,
        FlowTechnoController,
        {
          path: 'auth/authorized',
          method: RequestMethod.GET,
        },
        'apps',
        'flow-technos',
        'app-technos',
        'users',
      );
  }
}

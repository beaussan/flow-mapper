import { Module } from '@nestjs/common';
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
      // logging: 'all',
    }),
    RouterModule.forRoutes(appRoutes),

    AuthModule,

    SearchModule,

    AppTechnoModule,

    FlowAppModule,

    FlowTechnoModule,

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppTechnoController } from './app-techno.controller';
import { AppTechnoService } from './app-techno.service';
import { AppTechno } from './app-techno.entity';
import { SearchModule } from '../core/search/search.module';
import { AppTechnoRepository } from './app-techno.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppTechno, AppTechnoRepository]),
    SearchModule,
  ],
  controllers: [AppTechnoController],
  providers: [AppTechnoService],
  exports: [AppTechnoService],
})
export class AppTechnoModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowApp } from './flow-app.entity';
import { FlowAppService } from './flow-app.service';
import { FlowAppRepository } from './flow-app.repository';
import { FlowAppController } from './flow-app.controller';
import { SearchModule } from '../core/search/search.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlowApp, FlowAppRepository]),
    SearchModule,
  ],
  providers: [FlowAppService],
  controllers: [FlowAppController],
})
export class FlowAppModule {}

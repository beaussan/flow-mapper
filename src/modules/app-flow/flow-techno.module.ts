import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowTechnoController } from './flow-techno.controller';
import { FlowTechnoService } from './flow-techno.service';
import { FlowTechno } from './flow-techno.entity';
import { SearchModule } from '../core/search/search.module';
import { FlowTechnoRepository } from './flow-techno.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FlowTechno, FlowTechnoRepository]),
    SearchModule,
  ],
  controllers: [FlowTechnoController],
  providers: [FlowTechnoService],
  exports: [FlowTechnoService],
})
export class FlowTechnoModule {}

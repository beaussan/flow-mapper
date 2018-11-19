import { Module } from '@nestjs/common';
import { FlowController } from './flow.controller';
import { FlowService } from './flow.service';
import { FlowApp } from '../flow-app/flow-app.entity';
import { FlowAppModule } from '../flow-app/flow-app.module';
import { FlowTechnoModule } from '../flow-techno/flow-techno.module';

@Module({
  controllers: [FlowController],
  providers: [FlowService],
  imports: [FlowAppModule, FlowTechnoModule],
})
export class FlowModule {}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { FlowApp } from './flow-app.entity';
import { FlowAppService } from './flow-app.service';
import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { AppTechno } from '../app-techno/app-techno.entity';
import { FlowAppDto } from './flow-app.dto';

@ApiUseTags('Apps')
@Controller()
export class FlowAppController {
  constructor(private readonly flowAppService: FlowAppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The list of all the apps.',
    type: AppTechno,
    isArray: true,
  })
  getAll(): Promise<FlowApp[]> {
    return this.flowAppService.getAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The app created',
    type: AppTechno,
  })
  saveNewFlowApp(@Body() app: FlowAppDto): Promise<FlowApp> {
    return this.flowAppService.saveNewApp(app);
  }
}

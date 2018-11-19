import { Body, Controller, Get, Post } from '@nestjs/common';
import { FlowService } from './flow.service';
import { ApiResponse } from '@nestjs/swagger';
import { Flow } from './flow.entity';
import { FlowDto } from './flow.dto';

@Controller('flow')
export class FlowController {
  constructor(private readonly flowService: FlowService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get a list of all flows',
    type: Flow,
    isArray: true,
  })
  getAll(): Promise<Flow[]> {
    return this.flowService.getAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Creation of a flow',
    type: Flow,
  })
  saveNew(@Body() flow: FlowDto): Promise<Flow> {
    return this.flowService.saveNewFlow(flow);
  }
}

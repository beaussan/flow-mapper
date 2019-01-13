import { Body, Controller, Get, Post } from '@nestjs/common';
import { FlowService } from './flow.service';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Flow } from './flow.entity';
import { FlowDtoInput, FLowDtoOutput } from './flow.dto';

@ApiUseTags('Flow')
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
  getAll(): Promise<FLowDtoOutput[]> {
    return this.flowService.getAllWithDto();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Creation of a flow',
    type: Flow,
  })
  saveNew(@Body() flow: FlowDtoInput): Promise<FLowDtoOutput> {
    return this.flowService.saveNewFlow(flow);
  }
}

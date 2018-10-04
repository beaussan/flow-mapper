import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { FlowApp } from './flow-app.entity';
import { FlowAppService } from './flow-app.service';
import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { FlowAppDto } from './flow-app.dto';
import { AppTechno } from '../app-techno/app-techno.entity';

@ApiUseTags('Apps')
@Controller()
export class FlowAppController {
  constructor(private readonly flowAppService: FlowAppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The list of all the apps.',
    type: FlowApp,
    isArray: true,
  })
  getAll(): Promise<FlowApp[]> {
    return this.flowAppService.getAll();
  }

  // Query
  /*
    @Get('search')
    @ApiResponse({
      status: 200,
      description: 'Apps that match with the search query',
      type: FlowApp,
      isArray: true,
    })
    @ApiResponse({ status: 404, description: 'Not found.' })
    async search(@Query('query') query: string): Promise<FlowApp[]> {
      console.log('ALLOOOOOOOO', query);
      return this.flowAppService.find(query);
    }
  */
  @Get('search')
  @ApiResponse({
    status: 200,
    description: 'The app technology  with the matching id',
    type: AppTechno,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async search(@Query('query') query: string): Promise<FlowApp[]> {
    return this.flowAppService.find(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The app concerned.',
    type: FlowApp,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<FlowApp> {
    return (await this.flowAppService.getOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The app created',
    type: FlowApp,
  })
  saveNewFlowApp(@Body() app: FlowAppDto): Promise<FlowApp> {
    return this.flowAppService.saveNewApp(app);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FlowTechno } from './flow-techno.entity';
import { FlowTechnoService } from './flow-techno.service';
import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { FlowTechnoDto } from './flow-techno.dto';

@ApiUseTags('Techno Flow')
@Controller()
export class FlowTechnoController {
  constructor(private readonly flowTechnoService: FlowTechnoService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get a list of all flow technology.',
    type: FlowTechno,
    isArray: true,
  })
  getAll(): Promise<FlowTechno[]> {
    return this.flowTechnoService.getAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The flow technology has been created.',
    type: FlowTechno,
  })
  saveNew(@Body() tech: FlowTechnoDto): Promise<FlowTechno> {
    return this.flowTechnoService.saveNewTechno(tech.name);
  }

  // Query
  @Get('search')
  @ApiResponse({
    status: 200,
    description: 'The flow technology  with the matching id',
    type: FlowTechno,
    isArray: true,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async search(@Query('query') query: string): Promise<FlowTechno[]> {
    return this.flowTechnoService.find(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The flow technology  with the matching id',
    type: FlowTechno,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<FlowTechno> {
    return (await this.flowTechnoService.getOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated flow technology with the matching id',
    type: FlowTechno,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  // @ApiImplicitParam({ type: Number, name: 'id', required: true })
  async updateOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() tech: FlowTechnoDto,
  ): Promise<FlowTechno> {
    return this.flowTechnoService.updateName(id, tech.name);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated flow technology with the matching id',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async deleteOne(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    await this.flowTechnoService.deleteById(id);
  }
}

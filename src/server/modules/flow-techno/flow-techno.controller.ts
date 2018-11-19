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
import { Roles } from '../../decorators/roles.decorator';
import { ROLES } from '../user/role.constants';

@ApiUseTags('Techno Flow')
@Controller()
@ApiBearerAuth()
export class FlowTechnoController {
  constructor(private readonly flowTechnoService: FlowTechnoService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get a list of all flow technology.',
    type: FlowTechno,
    isArray: true,
  })
  @Roles(ROLES.ROLE_USER)
  getAll(): Promise<FlowTechno[]> {
    return this.flowTechnoService.getAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The flow technology has been created.',
    type: FlowTechno,
  })
  @Roles(ROLES.ROLE_EDIT_FLOW)
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
  @Roles(ROLES.ROLE_USER)
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
  @Roles(ROLES.ROLE_USER)
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
  @Roles(ROLES.ROLE_EDIT_FLOW)
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
  @Roles(ROLES.ROLE_EDIT_FLOW)
  @ApiResponse({ status: 404, description: 'Not found.' })
  async deleteOne(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    await this.flowTechnoService.deleteById(id);
  }
}

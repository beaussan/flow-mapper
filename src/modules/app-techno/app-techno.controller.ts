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
import { AppTechno } from './app-techno.entity';
import { AppTechnoService } from './app-techno.service';
import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { AppTechnoDto } from './app-techno.dto';

@ApiUseTags('Techno')
@Controller('app-techno')
export class AppTechnoController {
  constructor(private readonly appTechnoService: AppTechnoService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get a list of all app technology.',
    type: AppTechno,
    isArray: true,
  })
  getAll(): Promise<AppTechno[]> {
    return this.appTechnoService.getAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The app technology has been created.',
    type: AppTechno,
  })
  saveNew(@Body() tech: AppTechnoDto): Promise<AppTechno> {
    return this.appTechnoService.saveNewTechno(tech.name);
  }

  // Query
  @Get('search')
  @ApiResponse({
    status: 200,
    description: 'The app technology  with the matching id',
    type: AppTechno,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async search(@Query('query') query: string): Promise<AppTechno[]> {
    return this.appTechnoService.find(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The app technology  with the matching id',
    type: AppTechno,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<AppTechno> {
    return (await this.appTechnoService.getOneById(id)).orElseThrow(
      () => new NotFoundException(),
    );
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated app technology with the matching id',
    type: AppTechno,
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  // @ApiImplicitParam({ type: Number, name: 'id', required: true })
  async updateOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() tech: AppTechnoDto,
  ): Promise<AppTechno> {
    return this.appTechnoService.updateName(id, tech.name);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated app technology with the matching id',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async deleteOne(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    await this.appTechnoService.deleteById(id);
  }
}

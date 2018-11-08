import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from './modules/core/logger/logger.service';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AppConfigDto } from './app.config.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private loggerService: LoggerService,
  ) {}

  @ApiUseTags('health')
  @Get('/ping')
  @ApiResponse({
    status: 200,
    description: 'Return pong to tell if it is alive',
  })
  root(): string {
    return 'pong';
  }

  @ApiUseTags('config')
  @Get('/config')
  @ApiResponse({
    status: 200,
    description: 'Return a summary of the config of the server',
  })
  public getConfig(): AppConfigDto {
    return this.appService.getConfig();
  }
}

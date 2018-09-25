import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from './modules/core/logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private loggerService: LoggerService,
  ) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('/logger')
  public async logger() {
    this.loggerService.error('error');
    this.loggerService.warn('warning');
    this.loggerService.debug('debug');
    this.loggerService.info('info');
    this.loggerService.silly('silly');
  }
}

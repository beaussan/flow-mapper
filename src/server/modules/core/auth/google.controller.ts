import {
  ApiResponse,
  ApiUseTags,
  ApiImplicitBody,
  ApiBearerAuth,
  ApiImplicitQuery,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  MethodNotAllowedException,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CurrentUser } from '../../../decorators/currentUser.decorator';
import { User } from '../../user/user.entity';
import { Token } from './interfaces/token.interface';
import { AuthService } from './auth.service';
import { LoggerService } from '../logger/logger.service';

// @UseGuards(RolesGuard)
@ApiUseTags('Auth/google')
@Controller()
export class GoogleController {
  constructor(
    private readonly authService: AuthService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get('google/uri')
  @ApiResponse({ status: 200, description: 'the google redirect uri' })
  async requestGoogleRedirectUri(): Promise<any> {
    if (process.env.GOOGLE_AUTH_ENABLED !== 'true') {
      throw new MethodNotAllowedException('GOOGLE LOGIN NOT ENABLED');
    }
    return await this.authService.requestGoogleRedirectUri();
  }

  @Post('google/signin')
  async googleSignIn(@Req() req: Request): Promise<any> {
    if (process.env.GOOGLE_AUTH_ENABLED !== 'true') {
      throw new MethodNotAllowedException('GOOGLE LOGIN NOT ENABLED');
    }
    return await this.authService.googleSignIn(req.body.code);
  }

  @Post('google/token')
  @ApiResponse({ status: 200, description: 'the jwt auth token' })
  async requestJsonWebTokenAfterGoogleSignIn(
    @CurrentUser() user: User,
  ): Promise<Token> {
    if (process.env.GOOGLE_AUTH_ENABLED !== 'true') {
      throw new MethodNotAllowedException('GOOGLE LOGIN NOT ENABLED');
    }
    return await this.authService.createToken(user);
  }
}

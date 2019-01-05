import {
  Body,
  Controller,
  Get,
  MethodNotAllowedException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../../decorators/roles.decorator';
import { RolesGuard } from '../../../guards/roles.guard';
import { CurrentUser } from '../../../decorators/currentUser.decorator';
import { Token } from './interfaces/token.interface';
import { LoggerService } from '../logger/logger.service';
import { User } from '../../user/user.entity';
import {
  ApiResponse,
  ApiUseTags,
  ApiImplicitBody,
  ApiBearerAuth,
  ApiImplicitQuery,
} from '@nestjs/swagger';
import { LocalAuthInterface } from './interfaces/local-auth.interface';
import { ROLES } from '../../user/role.constants';
import { FacebookLogin } from './interfaces/facebook-config.interface';

// @UseGuards(RolesGuard)
@ApiUseTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly loggerService: LoggerService,
  ) {}

  @Post('local/login')
  @Roles(ROLES.ROLE_USER)
  @ApiResponse({ status: 200, description: 'Local sign up successful' })
  @ApiImplicitBody({ type: LocalAuthInterface, required: true, name: 'login' })
  async requestJsonWebTokenAfterLocalSignUp(
    @CurrentUser() user: User,
  ): Promise<Token> {
    return await this.authService.createToken(user);
  }

  @Post('local/register')
  @ApiResponse({ status: 200, description: 'Local sign in successful' })
  @ApiImplicitBody({ type: LocalAuthInterface, required: true, name: 'login' })
  async requestJsonWebTokenAfterLocalSignIn(
    @CurrentUser() user: User,
  ): Promise<Token> {
    if (process.env.LOCAL_REGISTER_ENABLED !== 'true') {
      throw new MethodNotAllowedException('LOCAL REGISTER NOT ENABLED');
    }
    return await this.authService.createToken(user);
  }

  // TODO : GLOBAL GUARD THAT DO JWT AND ANONYMOUS PASSPORT
  @Get('authorized')
  @Roles(ROLES.ROLE_USER)
  @ApiResponse({ status: 200, description: '' })
  @ApiBearerAuth()
  public authorized(@CurrentUser() user: User): User {
    this.loggerService.log('Request: ', user);
    this.loggerService.log('Authorized route...');
    return user;
  }
}

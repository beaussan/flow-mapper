import { Body, Controller, Get, MethodNotAllowedException, Post } from '@nestjs/common';
import { FacebookLogin } from './interfaces/facebook-config.interface';
import { Token } from './interfaces/token.interface';
import { CurrentUser } from '../../../decorators/currentUser.decorator';
import { User } from '../../user/user.entity';
import { AuthService } from './auth.service';
import { LoggerService } from '../logger/logger.service';
import {
  ApiResponse,
  ApiUseTags,
  ApiImplicitBody,
  ApiBearerAuth,
  ApiImplicitQuery,
} from '@nestjs/swagger';

// @UseGuards(RolesGuard)
@ApiUseTags('Auth/facebook')
@Controller()
export class FacebookController {

  constructor(
    private readonly authService: AuthService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get('facebook/uri')
  @ApiResponse({ status: 200, description: 'the facebook redirect uri' })
  async requestFacebookRedirectUrl(): Promise<{ redirect_uri: string }> {
    if (process.env.FB_AUTH_ENABLED !== 'true') {
      throw new MethodNotAllowedException('FB LOGIN NOT ENABLED');
    }
    return await this.authService.requestFacebookRedirectUri();
  }

  @Post('facebook/signin')
  async facebookSignIn(@Body() fbLogin: FacebookLogin): Promise<Token> {
    if (process.env.FB_AUTH_ENABLED !== 'true') {
      throw new MethodNotAllowedException('FB LOGIN NOT ENABLED');
    }
    return await this.authService.facebookSignIn(fbLogin.code);
  }

  @Post('facebook/token')
  @ApiResponse({ status: 200, description: 'the jwt auth token' })
  async requestJsonWebTokenAfterFacebookSignIn(
    @CurrentUser() user: User,
  ): Promise<Token> {
    if (process.env.FB_AUTH_ENABLED !== 'true') {
      throw new MethodNotAllowedException('FB LOGIN NOT ENABLED');
    }
    return await this.authService.createToken(user);
  }
}
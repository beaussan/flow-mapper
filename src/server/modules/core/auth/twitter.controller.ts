import {
  ApiResponse,
  ApiUseTags,
  ApiImplicitBody,
  ApiBearerAuth,
  ApiImplicitQuery,
} from '@nestjs/swagger';
import { Controller, Get, MethodNotAllowedException, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CurrentUser } from '../../../decorators/currentUser.decorator';
import { User } from '../../user/user.entity';
import { Token } from './interfaces/token.interface';
import { AuthService } from './auth.service';
import { LoggerService } from '../logger/logger.service';

// @UseGuards(RolesGuard)
@ApiUseTags('Auth/twitter')
@Controller()
export class TwitterController {

  constructor(
    private readonly authService: AuthService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get('twitter/uri')
  @ApiResponse({ status: 200, description: 'the twitter redirect uri' })
  async requestTwitterRedirectUri(): Promise<any> {
    if (process.env.TWITTER_AUTH_ENABLED !== 'true') {
      throw new MethodNotAllowedException('TWITTER LOGIN NOT ENABLED');
    }
    return await this.authService.requestTwitterRedirectUri();
  }

  @Post('twitter/signin')
  async twitterSignIn(@Req() req: Request): Promise<any> {
    if (process.env.TWITTER_AUTH_ENABLED !== 'true') {
      throw new MethodNotAllowedException('TWITTER LOGIN NOT ENABLED');
    }
    return await this.authService.twitterSignIn(
      req.body.oauth_token,
      req.body.oauth_verifier,
    );
  }

  @Post('twitter/token')
  @ApiResponse({ status: 200, description: 'the jwt auth token' })
  async requestJsonWebTokenAfterTwitterSignIn(
    @CurrentUser() user: User,
  ): Promise<Token> {
    if (process.env.TWITTER_AUTH_ENABLED !== 'true') {
      throw new MethodNotAllowedException('TWITTER LOGIN NOT ENABLED');
    }
    return await this.authService.createToken(user);
  }
}
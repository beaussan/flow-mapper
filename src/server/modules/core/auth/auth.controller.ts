import {
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
} from '@nestjs/swagger';
import { LocalAuthInterface } from './interfaces/local-auth.interface';
import { ROLES } from '../../user/role.constants';

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

  @Get('facebook/uri')
  @ApiResponse({ status: 200, description: 'the facebook redirect uri' })
  async requestFacebookRedirectUrl(): Promise<{ redirect_uri: string }> {
    if (process.env.FB_AUTH_ENABLED !== 'true') {
      throw new MethodNotAllowedException('FB LOGIN NOT ENABLED');
    }
    return await this.authService.requestFacebookRedirectUri();
  }

  @Post('facebook/signin')
  async facebookSignIn(@Req() req: Request): Promise<Token> {
    if (process.env.FB_AUTH_ENABLED !== 'true') {
      throw new MethodNotAllowedException('FB LOGIN NOT ENABLED');
    }
    return await this.authService.facebookSignIn(req.body.code);
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

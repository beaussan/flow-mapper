import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../../decorators/roles.decorator';
import { RolesGuard } from '../../../guards/roles.guard';
import { CurrentUser } from '../../../decorators/currentUser.decorator';
import { Token } from './interfaces/token.interface';
import { LoggerService } from '../logger/logger.service';
import { User } from '../../user/user.entity';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly loggerService: LoggerService,
  ) {}

  @Post('local/signup')
  async requestJsonWebTokenAfterLocalSignUp(
    @CurrentUser() user: User,
  ): Promise<Token> {
    return await this.authService.createToken(user);
  }

  @Post('local/signin')
  async requestJsonWebTokenAfterLocalSignIn(
    @CurrentUser() user: User,
  ): Promise<Token> {
    return await this.authService.createToken(user);
  }

  @Get('facebook/uri')
  async requestFacebookRedirectUrl(): Promise<{ redirect_uri: string }> {
    return await this.authService.requestFacebookRedirectUri();
  }

  @Post('facebook/signin')
  async facebookSignIn(@Req() req: Request): Promise<Token> {
    return await this.authService.facebookSignIn(req.body.code);
  }

  @Post('facebook/token')
  async requestJsonWebTokenAfterFacebookSignIn(
    @CurrentUser() user: User,
  ): Promise<Token> {
    return await this.authService.createToken(user);
  }

  @Get('twitter/uri')
  async requestTwitterRedirectUri(): Promise<any> {
    return await this.authService.requestTwitterRedirectUri();
  }

  @Post('twitter/signin')
  async twitterSignIn(@Req() req: Request): Promise<any> {
    return await this.authService.twitterSignIn(
      req.body.oauth_token,
      req.body.oauth_verifier,
    );
  }

  @Post('twitter/token')
  async requestJsonWebTokenAfterTwitterSignIn(
    @CurrentUser() user: User,
  ): Promise<Token> {
    return await this.authService.createToken(user);
  }

  @Get('google/uri')
  async requestGoogleRedirectUri(): Promise<any> {
    return await this.authService.requestGoogleRedirectUri();
  }

  @Post('google/signin')
  async googleSignIn(@Req() req: Request): Promise<any> {
    return await this.authService.googleSignIn(req.body.code);
  }

  @Post('google/token')
  async requestJsonWebTokenAfterGoogleSignIn(
    @CurrentUser() user: User,
  ): Promise<Token> {
    return await this.authService.createToken(user);
  }

  @Get('authorized')
  @Roles('user')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  public async authorized() {
    this.loggerService.log('Authorized route...');
  }
}

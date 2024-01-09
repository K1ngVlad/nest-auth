import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto, RegisteredUserDto } from './Dto';
import { Request, Response } from 'express';
import { REFRESH_TOKEN_COOKIE_TIME } from './constants';
import { TokenDocument } from 'src/jwt/schemas';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(
    @Body() userDto: RegisterUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<RegisteredUserDto> {
    const registeredUserDto = await this.authService.registration(userDto);
    const { refreshToken } = registeredUserDto;

    response.cookie('refreshToken', refreshToken, {
      maxAge: REFRESH_TOKEN_COOKIE_TIME,
      httpOnly: true,
      secure: true,
    });

    return registeredUserDto;
  }

  @Post('login')
  async login(
    @Body() userDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<RegisteredUserDto> {
    const registeredUserDto = await this.authService.login(userDto);
    const { refreshToken } = registeredUserDto;

    response.cookie('refreshToken', refreshToken, {
      maxAge: REFRESH_TOKEN_COOKIE_TIME,
      httpOnly: true,
      secure: true,
    });

    return registeredUserDto;
  }

  @Get('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<TokenDocument | null> {
    const { refreshToken } = request.cookies;

    if (refreshToken) {
      const token = await this.authService.logout(refreshToken);
      response.clearCookie('refreshToken');
      return token;
    }

    return null;
  }

  @Get('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<RegisteredUserDto> {
    const { refreshToken } = request.cookies;
    const registeredUserDto = await this.authService.refresh(refreshToken);
    const newRefreshToken = registeredUserDto.refreshToken;

    response.cookie('refreshToken', newRefreshToken, {
      maxAge: REFRESH_TOKEN_COOKIE_TIME,
      httpOnly: true,
      secure: true,
    });
    return registeredUserDto;
  }
}

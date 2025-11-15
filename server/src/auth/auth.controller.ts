/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Post, Body, Res, HttpCode, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response, Request } from 'express';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

type RequestWithCookies = Request & { cookies: Record<string, string> };

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto, @Res() res: Response) {
    const { user, tokens } = await this.authService.signup(dto);

    this.setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

    return res
      .status(201)
      .json({ id: user.id, email: user.email, fullName: user.fullName });
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateAndStoreRefreshToken(
      user.id,
    );

    this.setAuthCookies(res, accessToken, refreshToken);

    return res.json({ id: user.id, email: user.email });
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Req() req: RequestWithCookies, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      return res.status(401).json({ message: 'Missing token' });
    }

    const tokens = await this.authService.refreshTokens(refreshToken);
    if (!tokens) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    this.setAuthCookies(res, tokens.accessToken, tokens.refreshToken);
    return res.json({ accessToken: tokens.accessToken });
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: RequestWithCookies, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    if (refreshToken) {
      await this.authService.revokeRefreshToken(refreshToken);
    }

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.json({ message: 'Logged out successfully' });
  }

  private setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite:
        (process.env.COOKIE_SAMESITE as 'lax' | 'strict' | 'none') || 'lax',
      path: '/',
      domain: process.env.COOKIE_DOMAIN || undefined,
    };

    res.cookie('access_token', accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refresh_token', refreshToken, {
      ...cookieOptions,
      maxAge: 30 * 24 * 3600 * 1000,
    });
  }
}

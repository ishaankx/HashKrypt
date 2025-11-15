import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { User, RefreshToken } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // === SIGNUP ===
  async signup(dto: {
    email: string;
    password: string;
    fullName?: string;
    phone?: string;
    country?: string;
    publicKey: string;
    encryptedPrivKeyBlob: Prisma.InputJsonValue;
  }): Promise<{
    user: User;
    tokens: { accessToken: string; refreshToken: string };
  }> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new Error('Email already in use');

    const passwordHash = await argon2.hash(dto.password, {
      type: argon2.argon2id,
    });

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        fullName: dto.fullName,
        phone: dto.phone,
        country: dto.country,
        passwordHash,
        pubKey: dto.publicKey,
        encryptedPrivKeyBlob: dto.encryptedPrivKeyBlob,
      },
    });

    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateAndStoreRefreshToken(user.id);

    return { user, tokens: { accessToken, refreshToken } };
  }

  // === LOGIN VALIDATION ===
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const ok = await argon2.verify(user.passwordHash, password);
    if (!ok) return null;

    return user;
  }

  // === ACCESS TOKEN ===
  generateAccessToken(user: User): string {
    return this.jwtService.sign(
      { sub: user.id, email: user.email },
      { expiresIn: '15m' },
    );
  }

  // === REFRESH TOKEN CREATION ===
  async generateAndStoreRefreshToken(userId: string): Promise<string> {
    const token = randomBytes(64).toString('hex');
    const hash = await argon2.hash(token);

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: hash,
        expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000), // 30 days
      },
    });

    return token;
  }

  // === REFRESH TOKENS (ROTATE) ===
  async refreshTokens(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    const tokens = await this.prisma.refreshToken.findMany({
      where: { revoked: false },
    });

    let stored: RefreshToken | null = null;
    for (const t of tokens) {
      if (await argon2.verify(t.tokenHash, refreshToken)) {
        stored = t;
        break;
      }
    }

    if (!stored) return null;

    const user = await this.prisma.user.findUnique({
      where: { id: stored.userId },
    });
    if (!user) return null;

    // revoke old token
    await this.prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revoked: true },
    });

    // issue new refresh token
    const newRefreshToken = randomBytes(64).toString('hex');
    const refreshHash = await argon2.hash(newRefreshToken);

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshHash,
        expiresAt: new Date(Date.now() + 30 * 24 * 3600 * 1000),
      },
    });

    const newAccessToken = this.generateAccessToken(user);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  // === REVOKE REFRESH TOKEN ===
  async revokeRefreshToken(refreshToken: string): Promise<boolean> {
    const tokens = await this.prisma.refreshToken.findMany({
      where: { revoked: false },
    });

    for (const t of tokens) {
      if (await argon2.verify(t.tokenHash, refreshToken)) {
        await this.prisma.refreshToken.update({
          where: { id: t.id },
          data: { revoked: true },
        });
        return true;
      }
    }

    return false;
  }
}

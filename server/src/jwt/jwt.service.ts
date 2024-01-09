import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as jsonwebtoken from 'jsonwebtoken';
import { TokensDto } from './dto/tokens.dto';
import { Token, TokenDocument } from './schemas';
import { UserDto } from 'src/users/Dto';
import { UserJwtPayload } from './types';

@Injectable()
export class JwtService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}

  generateTokens(payload: UserDto): TokensDto {
    const accessToken = jsonwebtoken.sign(
      payload,
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: '30m',
      },
    );
    const refreshToken = jsonwebtoken.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: '30d',
      },
    );
    return { accessToken, refreshToken };
  }

  async saveRefreshToken(
    userId: Types.ObjectId,
    refreshToken: string,
  ): Promise<TokenDocument> {
    const tokenData = await this.tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await this.tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeRefreshToken(refreshToken: string): Promise<TokenDocument> {
    const tokenData = this.tokenModel.findOne({ refreshToken });
    await this.tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  validateAccessToken(accessToken: string): UserJwtPayload | null {
    try {
      return <UserJwtPayload>(
        jsonwebtoken.verify(accessToken, process.env.JWT_ACCESS_SECRET)
      );
    } catch {
      return null;
    }
  }

  validateRefreshToken(refreshToken: string): UserJwtPayload | null {
    try {
      return <UserJwtPayload>(
        jsonwebtoken.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
      );
    } catch {
      return null;
    }
  }

  async findRefreshToken(refreshToken: string): Promise<TokenDocument> {
    return this.tokenModel.findOne({ refreshToken });
  }
}

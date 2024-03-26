import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { errorResponse } from 'src/common/utils/data-return';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: AuthRegisterLoginDto) {
    const email = await this.usersService.findOne({ email: dto.email });

    const user = await this.usersService.create({
      ...dto,
      role: { id: 2 },
    });
    const omitSensitiveInfo = (user: User) => {
      const { password, phone_number, ...userData } = user;
      return userData;
    };

    return omitSensitiveInfo(user);
  }

  async login(dto: AuthRegisterLoginDto, res: Response) {
    const user = await this.usersService.findOne({ email: dto.email });

    if (!user) {
      errorResponse(HttpStatus.UNPROCESSABLE_ENTITY, 'Error', {
        email: 'Email wrong',
      });
    }

    const isPassword = await bcrypt.compare(dto.password, user.password);

    if (!isPassword) {
      errorResponse(HttpStatus.UNPROCESSABLE_ENTITY, 'Error', {
        password: 'Password wrong',
      });
    }

    const tokens = await this.generateToken(user.id.toString(), user.name);

    const omitSensitiveInfo = (user: User) => {
      const { password, phone_number, ...userData } = user;
      return userData;
    };

    res.cookie('access_token', tokens.accessToken, { httpOnly: true });
    res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });

    return {
      user: omitSensitiveInfo(user),
      access_token: tokens.accessToken,
      expires: process.env.REFRESH_TOKEN_EXPIRES_IN,
      refresh_token: tokens.refreshToken,
      expires_refresh_token: process.env.ACCESS_TOKEN_EXPIRES_IN,
    };
  }

  async generateToken(userId: string, name: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          name,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          name,
        },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        },
      ),
    ]);

    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    };
  }
}

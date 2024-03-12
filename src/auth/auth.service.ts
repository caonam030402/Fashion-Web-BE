import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { errorResponse } from 'src/common/utils/data-return';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(dto: AuthRegisterLoginDto) {
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

  async login(dto: AuthRegisterLoginDto) {
    const user = await this.usersService.findOne({ email: dto.email });

    if (!user) {
      errorResponse(HttpStatus.UNPROCESSABLE_ENTITY, 'Email wrong');
    }

    if (!(user.password === dto.password)) {
      errorResponse(HttpStatus.UNPROCESSABLE_ENTITY, 'Password wrong');
    }

    const tokens = await this.generateToken(user.id.toString(), user.name);

    const omitSensitiveInfo = (user: User) => {
      const { password, phone_number, ...userData } = user;
      return userData;
    };

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

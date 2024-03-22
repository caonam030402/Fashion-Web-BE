import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { ApiTags } from '@nestjs/swagger';
import { successResponse } from 'src/common/utils/data-return';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() dto: AuthRegisterLoginDto) {
    const user = await this.authService.register(dto);
    return successResponse('Register success!', user);
  }

  @Post('/login')
  async login(
    @Body() dto: AuthRegisterLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.login(dto, response);
    return successResponse('Register success!', user);
  }
}

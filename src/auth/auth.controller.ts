import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { ApiTags } from '@nestjs/swagger';
import { successResponse } from 'src/common/utils/data-return';

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
  async login(@Body() dto: AuthRegisterLoginDto) {
    const user = await this.authService.login(dto);
    return successResponse('Register success!', user);
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async register(dto: AuthRegisterLoginDto) {
    return await this.userService.create({
      ...dto,
      role: { id: 2 },
    });
  }
}

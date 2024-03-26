import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getCollections(@Req() request: Request) {
    return this.usersService.findWithAccessToken(request);
  }
}

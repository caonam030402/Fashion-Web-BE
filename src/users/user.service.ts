import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

enum FieldUnique {
  EMAIL = 'email',
  PHONE_NUMBER = 'phone_number',
  NAME = 'name',
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async validationUnique(field: FieldUnique, value: string): Promise<void> {
    let user;

    if (field === FieldUnique.EMAIL) {
      user = await this.userRepo.findOne({ where: { email: value } });
    } else if (field === FieldUnique.PHONE_NUMBER) {
      user = await this.userRepo.findOne({ where: { phone_number: value } });
    } else if (field === FieldUnique.NAME) {
      user = await this.userRepo.findOne({ where: { name: value } });
    }

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: ['Field already exists'],
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async create(createUserDto: CreateUserDto) {
    await Promise.all([
      this.validationUnique(FieldUnique.NAME, createUserDto.name),
      this.validationUnique(FieldUnique.EMAIL, createUserDto.email),
    ]);

    const user = await this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }
}

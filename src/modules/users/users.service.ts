import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/common/types/entity-condition.type';
import { errorResponse } from 'src/common/utils/data-return';

enum FieldUnique {
  EMAIL = 'email',
  PHONE_NUMBER = 'phone_number',
  NAME = 'name',
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async validationUnique(field: FieldUnique, value: string): Promise<void> {
    if (field === FieldUnique.EMAIL) {
      const user = await this.userRepo.findOne({ where: { email: value } });
      if (user) {
        errorResponse(HttpStatus.UNPROCESSABLE_ENTITY, 'Field already exists', {
          email: 'Email đã tồn tại',
        });
      }
    } else if (field === FieldUnique.PHONE_NUMBER) {
      const user = await this.userRepo.findOne({
        where: { phone_number: value },
      });
    } else if (field === FieldUnique.NAME) {
      const user = await this.userRepo.findOne({ where: { name: value } });
      if (user) {
        errorResponse(HttpStatus.UNPROCESSABLE_ENTITY, 'Field already exists', {
          name: 'Tên đã tồn tại',
        });
      }
    }
  }

  async create(createUserDto: CreateUserDto) {
    await Promise.all([
      this.validationUnique(FieldUnique.EMAIL, createUserDto.email),
      this.validationUnique(FieldUnique.NAME, createUserDto.name),
    ]);

    const user = await this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  async findOne(fields: EntityCondition<User>) {
    const findOptions: FindOptionsWhere<User> = {};

    Object.keys(fields).forEach((key) => {
      findOptions[key] = fields[key];
    });
    return this.userRepo.findOne({ where: findOptions });
  }
}

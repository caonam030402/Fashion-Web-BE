import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { Repository } from 'typeorm';
import { UserDiscount } from './entities/user_discount.entity';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { FieldDiscount } from './enums/field-discounts';
import { CreateUserDiscountDto } from './dto/create-user-discount.dto';
import { successResponse } from 'src/common/utils/data-return';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepo: Repository<Discount>,

    @InjectRepository(UserDiscount)
    private readonly userDiscountRepo: Repository<UserDiscount>,
  ) {}

  async create(body: CreateDiscountDto[]) {
    const newDiscount = this.discountRepo.create(body);
    return await this.discountRepo.save(newDiscount);
  }

  async findById(id: number, type: 'discount' | 'userDiscount') {
    if (type === 'discount') {
      return await this.discountRepo.findOne({ where: { id } });
    }
    if (type === 'userDiscount') {
      return await this.userDiscountRepo.findOne({ where: { id } });
    }
  }

  async find(type: 'discount' | 'userDiscount') {
    if (type === 'discount') {
      return await this.discountRepo.find();
    } else if (type === 'userDiscount') {
      return await this.userDiscountRepo.find({
        relations: {
          discount: true,
        },
      });
    }
  }

  async createUserDiscounts(body: CreateUserDiscountDto) {
    const discount = await this.discountRepo.findOne({
      where: { id: body.discountId },
    });

    if (!discount) {
      return successResponse('Khong tim thay discount', null);
    }

    if (discount.quantity <= 0) {
      return successResponse('Discount da het so luong', null);
    }

    if (discount.minimumPrice > body.amount) {
      return successResponse(' Discount khong du tien', null);
    }

    discount.quantity = discount.quantity - 1;
    await this.discountRepo.save(discount);

    const newDiscount = this.userDiscountRepo.create(body);
    const discounts = await this.userDiscountRepo.save(newDiscount);

    return successResponse('Create success', discounts);
  }
}

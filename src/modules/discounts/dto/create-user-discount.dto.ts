import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TypeDiscount } from '../entities/user_discount.entity';

export class CreateUserDiscountDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNumber()
  discountId: number;

  @IsNumber()
  amount: number;
}

import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { TypeDiscount } from '../entities/user_discount.entity';

export class CreateDiscountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  minimumPrice: number;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsNotEmpty()
  @IsEnum(TypeDiscount)
  type: TypeDiscount;
}

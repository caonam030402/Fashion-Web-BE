import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'Footwear' })
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  buy_count: number;

  @IsNotEmpty()
  sizeId: number;

  statusId: number;

  @IsNotEmpty()
  price: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'Footwear' })
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  buy_count: number;

  statusId: number;

  @IsNotEmpty()
  price: number;
}

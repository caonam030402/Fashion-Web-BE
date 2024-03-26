import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateOrder {
  @ApiProperty({ example: 'Footwear' })
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  buyCount: number;

  @IsNotEmpty()
  status: number;

  @IsNotEmpty()
  price: number;
}

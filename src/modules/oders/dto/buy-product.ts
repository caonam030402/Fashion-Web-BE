import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class BuyProductDto {
  @ApiProperty({ example: 'Footwear' })
  @IsNotEmpty()
  orderDetailId: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  userId: string;
}

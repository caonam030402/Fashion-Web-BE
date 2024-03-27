import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateOrderDto {
  buy_count: number;

  statusId: number;
}

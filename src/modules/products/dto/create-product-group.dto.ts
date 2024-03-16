import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class CreateProductGroupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'LT 01' })
  name: string;
}

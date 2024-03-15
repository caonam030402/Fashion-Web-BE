import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class createSizeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'XL' })
  name: string;
}

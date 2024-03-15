import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class CreateColorDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Red' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '#33333' })
  code: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class CreateMaterialDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Mediterranean Suede' })
  name: string;
}

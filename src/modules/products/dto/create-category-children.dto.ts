import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateCategory {
  @ApiProperty({ example: 'Footwear' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({
    example: 'https://www.etq-amsterdam.com/',
  })
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    example: 'All-time classics.',
  })
  @IsNotEmpty()
  description: string | null;
}

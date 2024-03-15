import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Product } from 'src/entities/product.entity';
import { RoleDto } from 'src/modules/roles/dto/role.dto';

export class CreateProductDto {
  @ApiProperty({ example: 'Shoe nike' })
  @IsNotEmpty()
  name: string | null;

  @ApiProperty({ example: 'Shoe nike' })
  @IsNotEmpty()
  description: string | null;

  @ApiProperty({ example: 'Shoe nike' })
  @IsNotEmpty()
  quantity: number | null;

  @ApiProperty({ example: 'Shoe nike' })
  @IsNotEmpty()
  price: number | null;

  @ApiProperty({ example: 'Shoe nike' })
  @IsNotEmpty()
  price_before_discount: number | null;

  @ApiProperty({ example: 'Shoe nike' })
  @IsNotEmpty()
  sold: number | null;

  @ApiProperty({ example: 'Shoe nike' })
  @IsNotEmpty()
  image: string | null;

  @ApiProperty({ example: 'Shoe nike' })
  @IsNotEmpty()
  images: string[] | null;

  @ApiProperty({ example: 'Shoe nike' })
  @IsNotEmpty()
  size: string[] | null;

  @ApiProperty({ example: 'Shoe nike' })
  @IsNotEmpty()
  color: string[] | null;

  @ApiProperty({ example: 'Shoe nike' })
  @IsNotEmpty()
  category: string | null;
}

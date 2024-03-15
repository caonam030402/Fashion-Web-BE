import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Product } from 'src/entities/product.entity';
import { RoleDto } from 'src/modules/roles/dto/role.dto';

export class CreateProductDto {
  @ApiProperty({ example: 'LT 01 Premium Suede Court Blueberry' })
  @IsString()
  name: string;

  @ApiProperty({ example: 11 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 15 })
  @IsNumber()
  price_before_discount: number;

  @ApiProperty({
    example:
      'https://www.etq-amsterdam.com/cdn/shop/files/ETQ-Flatlay6Okt-20645_v1crob_640x.png?v=1710363975',
  })
  @IsString()
  image: string;

  @ApiProperty({
    example: [
      'https://www.etq-amsterdam.com/cdn/shop/files/ETQ-Flatlay6Okt-20718_v1crob_640x.png?v=1710363988',
    ],
  })
  @IsArray()
  images: string[];

  @ApiProperty({
    example: 200,
  })
  @IsNumber()
  sold: number;

  @ApiProperty({
    example:
      'Origin of style. Evolved, not altered. Modern classic in butter-soft suede. Single, thick layer for unparalleled comfort. Simple luxury, redefined.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Premium Suede',
  })
  @IsString()
  material: string;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  categoryId: number;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  categoryChildId: number;

  @ApiProperty({
    example: 10,
  })
  @IsInt()
  colorId: number;

  @ApiProperty({
    example: [1, 2, 3, 4, 5, 6, 7, 8],
  })
  @IsArray()
  @IsInt({ each: true })
  sizeIds: number[];
}

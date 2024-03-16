import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'LT 01 Premium Suede Court Blueberry',
    isArray: true,
  })
  @IsString()
  name: string;

  @ApiProperty({ example: 11, isArray: true })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 20, isArray: true })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 15, isArray: true })
  @IsNumber()
  price_before_discount: number;

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
  colorVariationIds: number[];

  @ApiProperty({
    example: [1, 2, 3, 4, 5, 6, 7, 8],
  })
  @IsArray()
  @IsInt({ each: true })
  sizeIds: number[];
}

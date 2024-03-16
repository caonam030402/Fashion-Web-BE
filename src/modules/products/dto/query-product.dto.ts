import { ApiProperty } from '@nestjs/swagger';

export class QueryProductDto {
  @ApiProperty({ example: 'Sand' })
  color?: string;

  @ApiProperty({ example: 'XL' })
  size?: string;

  @ApiProperty({ example: 'price' })
  sortBy?: string;

  @ApiProperty({ example: 'desc' })
  order?: string;

  @ApiProperty({ example: 'Loafers' })
  search?: string;
}

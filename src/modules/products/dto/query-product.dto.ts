import { ApiProperty } from '@nestjs/swagger';

export class QueryProductDto {
  @ApiProperty({ example: 'Sand' })
  color?: string;

  @ApiProperty({ example: 'XL' })
  size?: string;

  @ApiProperty({ example: 'price' })
  sortBy?: 'price' | 'new_in' | 'most_wanted';

  @ApiProperty({ example: 'desc' })
  order?: string;

  @ApiProperty({ example: 'Loafers' })
  search?: string;
}

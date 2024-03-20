import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCollection {
  @ApiProperty({ example: 'Footwear' })
  @IsNotEmpty()
  name: string | null;
}

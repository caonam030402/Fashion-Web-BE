import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Product } from 'src/entities/product.entity';
import { RoleDto } from 'src/modules/roles/dto/role.dto';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Footwear' })
  @IsNotEmpty()
  name: string | null;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { RoleDto } from 'src/modules/roles/dto/role.dto';

export class CreateUserDto {
  @ApiProperty({ example: 'caonam@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  name: string | null;

  @ApiProperty()
  avatar?: string;

  @ApiProperty()
  phone_number?: string;

  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto;
}

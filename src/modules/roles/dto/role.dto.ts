import { Allow, IsNumber } from 'class-validator';

export class RoleDto {
  @IsNumber()
  id: number;

  @Allow()
  name?: string;
}

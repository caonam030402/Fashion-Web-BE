import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_size' })
export class ProductSize {
  @PrimaryGeneratedColumn()
  public id: number;
}

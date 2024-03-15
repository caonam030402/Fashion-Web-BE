import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_by_size' })
export class ProductBySize {
  @PrimaryGeneratedColumn()
  public id: number;
}

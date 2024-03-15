import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  size: string;

  @ManyToMany(() => Product, (product) => product.sizes)
  products: Product[];
}

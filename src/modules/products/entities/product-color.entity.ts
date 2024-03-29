import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  code: string;

  @OneToMany((type) => Product, (product) => product.color)
  product: Product;

  @ManyToMany((type) => Product, (product) => product.colorVariations)
  products: Product[];
}

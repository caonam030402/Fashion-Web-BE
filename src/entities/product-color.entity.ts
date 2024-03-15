import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { ProductGroup } from './product-group.entity';

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

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Category } from './product-category';
import { Size } from './product-size.entity';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany((type) => Size, (size) => size.collection)
  sizes: Size[];

  @OneToMany((type) => Product, (product) => product.collection)
  product: Product[];

  @OneToMany((type) => Category, (category) => category.collection)
  children: Category[];
}

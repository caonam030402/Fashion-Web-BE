import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { CategoryChildren } from './product-category-children';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany((type) => Product, (product) => product.categories)
  product: Product[];

  @OneToMany(
    (type) => CategoryChildren,
    (categoryChildren) => categoryChildren.category,
  )
  children: CategoryChildren[];
}

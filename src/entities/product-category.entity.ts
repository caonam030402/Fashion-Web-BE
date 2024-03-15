import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  // @Column({ name: 'categoryClothe_id' })
  // categoryClotheId: string;

  // @Column({ name: 'categoryFootwear_id' })
  // categoryFootwearId: string;

  // @ManyToOne(
  //   (type) => CategoryFootwear,
  //   (CategoryFootwear) => CategoryFootwear.categories,
  // )
  // @JoinColumn({ name: 'categoryFootwear_id' })
  // categoryFootwear: CategoryFootwear;

  // @ManyToOne(
  //   (type) => CategoryClothe,
  //   (categoryClothe) => categoryClothe.categories,
  // )
  // @JoinColumn({ name: 'categoryClothe_id' })
  // categoryClothe: CategoryClothe;
}

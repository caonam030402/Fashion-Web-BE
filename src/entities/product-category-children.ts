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
import { Category } from './product-category.entity';

@Entity()
export class CategoryChildren {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column({ name: 'category_id' })
  categoryId: string;

  @ManyToOne((type) => Category, (category) => category.children)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany((type) => Product, (product) => product.categoryChildrens)
  products: Product[];
}

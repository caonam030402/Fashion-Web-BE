import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Collection } from './product-collection.entity';

@Entity()
export class Category {
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

  @ManyToOne((type) => Collection, (collection) => collection.children)
  @JoinColumn({ name: 'category_id' })
  collection: Collection;

  @OneToMany((type) => Product, (product) => product.category)
  products: Product[];
}

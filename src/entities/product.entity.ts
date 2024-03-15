import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Size } from './product-size.entity';
import { Color } from './product-color.entity';
import { Category } from './product-category.entity';
import { CategoryChildren } from './product-category-children';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  quantity: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  price_before_discount: number;

  @Column({ nullable: false })
  image: string;

  @Column({ type: 'simple-array', nullable: false })
  images: string[];

  @Column({ nullable: false })
  sold: number;

  @Column({ nullable: false })
  description: string;

  // @ManyToOne(() => Size, (size) => size.products)
  // sizes: Size[];

  // @ManyToOne((type) => Color, (color) => color.products)
  // colors: Color[];

  @Column({ name: 'category_id' })
  categoryId: string;

  @Column({ name: 'category_children' })
  categoryChildrenId: string;

  @Column({ name: 'color_id' })
  colorId: string;

  @ManyToOne((type) => Category, (category) => category.product)
  @JoinColumn({ name: 'category_id' })
  categories: Category;

  @ManyToOne(
    (type) => CategoryChildren,
    (categoryChildren) => categoryChildren.products,
  )
  @JoinColumn({ name: 'category_children' })
  categoryChildrens: CategoryChildren;

  @ManyToOne((type) => Color, (color) => color.product)
  @JoinColumn({ name: 'color_id' })
  color: Product;

  @Column({ nullable: false })
  material: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // @ManyToMany(() => Color, { cascade: true })
  // @JoinTable({
  //   name: 'product_group_by_color',
  //   joinColumn: {
  //     name: 'product_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'color_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // colors: Color[];

  // @ManyToMany(
  //   () => ProductGroupByColor,
  //   (productGroupByColor) => productGroupByColor.products,
  // )
  // productGroupByColor: Product[];
}

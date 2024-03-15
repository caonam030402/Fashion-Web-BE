import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Size } from './product-size.entity';
import { Color } from './product-color.entity';
import { Category } from './product-category.entity';
import { CategoryChildren } from './product-category-children';
import { ProductGroup } from './product-group.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  quantity: string;

  @Column()
  price: number;

  @Column()
  price_before_discount: number;

  @Column({ type: 'simple-array' })
  images: string[];

  @Column()
  sold: number;

  @Column()
  description: string;

  @Column()
  material: string;

  @Column({ name: 'category_id' })
  categoryId: string;

  @Column({ name: 'category_children' })
  categoryChildId: string;

  @Column({ name: 'color_id' })
  colorId: string;

  @Column({ name: 'product_group_id' })
  productGroupId: string;

  @ManyToMany(() => Color, (color) => color.products)
  @JoinTable({
    name: 'product-color',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'product-color_product_id',
    },
    inverseJoinColumn: {
      name: 'color_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'product-color_color_id',
    },
  })
  colorVariations: Color[];

  @ManyToOne((type) => Color, (color) => color.product)
  @JoinColumn({ name: 'color_id' })
  color: Product;

  @ManyToOne((type) => ProductGroup, (productGroup) => productGroup.products)
  @JoinColumn({ name: 'product_group_id' })
  productGroup: ProductGroup;

  @ManyToOne((type) => Category, (category) => category.product)
  @JoinColumn({ name: 'category_id' })
  categories: Category;

  @ManyToOne(
    (type) => CategoryChildren,
    (categoryChildren) => categoryChildren.products,
  )
  @JoinColumn({ name: 'category_children' })
  categoryChild: CategoryChildren;

  @ManyToMany(() => Size, (size) => size.products)
  @JoinTable({
    name: 'product_by_size',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'product_by_size_product_id',
    },
    inverseJoinColumn: {
      name: 'size_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'product_by_size_size_id',
    },
  })
  sizes: Size[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

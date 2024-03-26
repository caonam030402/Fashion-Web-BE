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
import { Collection } from './product-collection.entity';
import { Category } from './product-category';
import { ProductGroup } from './product-group.entity';
import { Material } from './product-material';
import { OrderDetail } from 'src/modules/oders/entities/order-detail.entity';

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

  @Column({ name: 'material_id', select: false })
  materialId: string;

  @Column({ name: 'collection_id', select: false })
  collectionId: string;

  @Column({ name: 'category', select: false })
  categoryId: string;

  @Column({ name: 'color_id', select: false })
  colorId: string;

  @Column({ name: 'product_group_id', select: false })
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

  @OneToMany((type) => OrderDetail, (orderDetail) => orderDetail.product)
  ordersDetail: OrderDetail[];

  @ManyToOne((type) => Color, (color) => color.product)
  @JoinColumn({ name: 'color_id' })
  color: Product;

  @ManyToOne((type) => ProductGroup, (productGroup) => productGroup.products)
  @JoinColumn({ name: 'product_group_id' })
  productGroup: ProductGroup;

  @ManyToOne((type) => Collection, (collection) => collection.product)
  @JoinColumn({ name: 'collection_id' })
  collection: Collection;

  @ManyToOne((type) => Material, (material) => material.product)
  @JoinColumn({ name: 'material_id' })
  material: Material;

  @ManyToOne((type) => Category, (category) => category.products)
  @JoinColumn({ name: 'category' })
  category: Category;

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

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}

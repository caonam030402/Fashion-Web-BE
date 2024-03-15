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
import { Product } from './product.entity';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  code_color: string;

  @OneToMany((type) => Product, (product) => product.color)
  product: Product[];

  // @ManyToMany(() => Product, { cascade: true })
  // @JoinTable({
  //   name: 'product_group_by_color',
  //   joinColumn: {
  //     name: 'color_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'product_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // products: Product[];

  // // @OneToMany(
  // //   () => ProductGroupByColor,
  // //   (productGroupByColor) => productGroupByColor.colors,
  // // )
  // productByColor: ProductGroupByColor[];
}

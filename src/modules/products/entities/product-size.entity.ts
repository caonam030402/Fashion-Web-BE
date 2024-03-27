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
import { Collection } from './product-collection.entity';
import { OrderDetail } from 'src/modules/oders/entities/order-detail.entity';

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  size: string;

  @ManyToMany(() => Product, (product) => product.sizes)
  products: Product[];

  @Column({ name: 'collection_id', select: false })
  collectionId: string;

  @ManyToOne((type) => Collection, (collection) => collection.sizes)
  @JoinColumn({ name: 'collection_id' })
  collection: Collection;

  @OneToMany((type) => OrderDetail, (orderDetail) => orderDetail.size)
  ordersDetail: OrderDetail[];
}

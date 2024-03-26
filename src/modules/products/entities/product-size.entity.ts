import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Collection } from './product-collection.entity';

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
}

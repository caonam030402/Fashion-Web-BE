import { Product } from 'src/modules/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  buy_count: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ name: 'order_id' })
  orderId: number;

  @ManyToOne((type) => Product, (user) => user.ordersDetail)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne((type) => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Product;
}
import { Product } from 'src/modules/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { OrderStatus } from './order-status.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  buy_count: number;

  @Column({ name: 'product_id' })
  productId: string;

  @Column({ name: 'order_id' })
  orderId: string;

  @Column({ name: 'status_id' })
  statusId: number;

  @ManyToOne((type) => Product, (user) => user.ordersDetail)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne((type) => OrderStatus, (orderStatus) => orderStatus.orderDetails)
  @JoinColumn({ name: 'status_id' })
  status: OrderStatus;

  @ManyToOne((type) => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Product;
}

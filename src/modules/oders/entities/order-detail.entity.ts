import { Product } from 'src/modules/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { OrderStatus } from './order-status.entity';
import { Size } from 'src/modules/products/entities/product-size.entity';

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

  @Column({ name: 'size_id' })
  sizeId: number;

  @ManyToOne((type) => Product, (user) => user.ordersDetail)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne((type) => OrderStatus, (orderStatus) => orderStatus.orderDetails)
  @JoinColumn({ name: 'status_id' })
  status: OrderStatus;

  @ManyToOne((type) => Size, (size) => size.ordersDetail)
  @JoinColumn({ name: 'size_id' })
  size: Size;

  @ManyToOne((type) => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Product;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}

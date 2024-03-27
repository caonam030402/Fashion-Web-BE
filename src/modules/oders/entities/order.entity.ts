import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderDetail } from './order-detail.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToMany((type) => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @ManyToOne((type) => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Discount } from './discount.entity';

export enum TypeDiscount {
  PERCENT = 'percent',
  MONEY = 'money',
}

@Entity()
export class UserDiscount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'discount_id' })
  discountId: number;

  @ManyToOne(() => User, (user) => user.discounts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Discount, (discount) => discount.discounts)
  @JoinColumn({ name: 'discount_id' })
  discount: Discount;
}

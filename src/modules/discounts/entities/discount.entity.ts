import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserDiscount } from './user_discount.entity';

export enum TypeDiscount {
  PERCENT = 'percent',
  MONEY = 'money',
}

@Entity()
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true })
  code: string;

  @Column()
  amount: number;

  @Column()
  quantity: number;

  @Column()
  minimumPrice: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({
    type: 'enum',
    enum: TypeDiscount,
    default: TypeDiscount.PERCENT,
  })
  type: TypeDiscount;

  @OneToMany((type) => UserDiscount, (discount) => discount.discount)
  discounts: UserDiscount[];
}

import { Module } from '@nestjs/common';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './discounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { UserDiscount } from './entities/user_discount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Discount, UserDiscount])],
  controllers: [DiscountsController],
  providers: [DiscountsService],
})
export class DiscountsModule {}

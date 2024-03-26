import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrder } from './dto/create-order';
import { successResponse } from 'src/common/utils/data-return';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderDetail)
    private readonly orderDetailRepo: Repository<OrderDetail>,
  ) {}

  async addToCart(dto: CreateOrder) {
    const { buyCount, price, productId, userId } = dto;

    const findOder = await this.orderRepo.findOne({
      where: { userId: userId, status: 1 },
      relations: { orderDetails: true },
    });

    let order: Order;
    if (!findOder) {
      order = this.orderRepo.create({
        userId: userId,
        status: 1,
      });

      order = await this.orderRepo.save(order);
    }

    const orderDetail = this.orderDetailRepo.create({
      buy_count: buyCount,
      price: price,
      productId: productId,
      orderId: findOder ? findOder.id : order.id,
    });

    return successResponse('Thêm sản phẩm thành công', orderDetail);
  }
}

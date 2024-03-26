import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderDto } from './dto/create-order';
import { successResponse } from 'src/common/utils/data-return';
import { BuyProductDto } from './dto/buy-product';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderDetail)
    private readonly orderDetailRepo: Repository<OrderDetail>,
  ) {}

  async addToCart(dto: CreateOrderDto) {
    const { userId } = dto;
    const findOrderForUser = await this.orderRepo.findOne({
      where: { userId: userId },
    });

    let order: Order;

    //Check xem user đã có đơn hàng chưa nếu chưa thì tạo đơn hàng của user
    if (!findOrderForUser) {
      const orderCreate = this.orderRepo.create({
        userId: userId,
      });
      order = await this.orderRepo.save(orderCreate);
    }

    const orderDetailCreate = this.orderDetailRepo.create({
      orderId: findOrderForUser ? findOrderForUser.id : order.id,
      status: 1,
      ...dto,
    });

    const orderDetail = this.orderDetailRepo.save(orderDetailCreate);

    return orderDetail;
  }

  async buyProduct(dto: BuyProductDto[]) {
    const orderDetailIds = dto.map((item) => item.orderDetailId);

    const orderDetailsToUpdate = await this.orderDetailRepo
      .createQueryBuilder()
      .update(OrderDetail)
      .set({ status: 2 })
      .where('id IN (:...orderDetailIds)', { orderDetailIds })
      .execute();

    return successResponse(
      `Mua ${orderDetailsToUpdate.affected} sản phẩm thành công`,
      undefined,
    );
  }
}

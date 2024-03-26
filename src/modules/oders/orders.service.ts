import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderDto } from './dto/create-order';
import { errorResponse, successResponse } from 'src/common/utils/data-return';
import { BuyProductDto } from './dto/buy-product';
import { OrderStatus } from './entities/order-status.entity';
import { StatusOrder } from './enums/status';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OrdersService {
  constructor(
    private jwtService: JwtService,

    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderDetail)
    private readonly orderDetailRepo: Repository<OrderDetail>,

    @InjectRepository(OrderStatus)
    private readonly orderStatusRepo: Repository<OrderStatus>,
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
      statusId: StatusOrder.IN_CART,
      ...dto,
    });

    const orderDetail = this.orderDetailRepo.save(orderDetailCreate);

    return orderDetail;
  }

  async createStatusOrder(dto) {
    const orderStatus = await this.orderStatusRepo.save(dto);
    return successResponse('Thêm trạng thái đơn hàng thành công', orderStatus);
  }

  async getOrder(status, request: Request) {
    const access_token =
      request.cookies['access_token'] &&
      request.cookies['access_token'].split(' ')[1];

    if (!access_token) {
      errorResponse(404, 'Vui lòng đăng nhập');
    }

    const decoded = this.jwtService.decode(access_token);
    const order = await this.orderRepo.find({
      where: {
        userId: decoded.id,
        orderDetails: {
          statusId: status,
        },
      },
      relations: {
        orderDetails: true,
      },
    });

    return successResponse('Lấy order thành công', order);
  }

  async buyProduct(dto: BuyProductDto[]) {
    const orderDetailIds = dto.map((item) => item.orderDetailId);

    const orderDetailsToUpdate = await this.orderDetailRepo
      .createQueryBuilder()
      .update(OrderDetail)
      .set({ statusId: StatusOrder.WAIT_FOR_CONFIRMATION })
      .where('id IN (:...orderDetailIds)', { orderDetailIds })
      .execute();

    return successResponse(
      `Mua ${orderDetailsToUpdate.affected} sản phẩm thành công`,
      undefined,
    );
  }
}

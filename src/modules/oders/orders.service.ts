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
import { UpdateOrderDto } from './dto/update-order';

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

  async addToCart(dto: CreateOrderDto, request: Request) {
    const access_token =
      request.cookies['access_token'] &&
      request.cookies['access_token'].split(' ')[1];

    if (!access_token) {
      errorResponse(404, 'Vui lòng đăng nhập');
    }

    const decoded = this.jwtService.decode(access_token);

    const findOrderForUser = await this.orderRepo.findOne({
      where: { userId: decoded.sub },
    });

    let order: Order;

    //Check xem user đã có đơn hàng chưa nếu chưa thì tạo đơn hàng của user
    if (!findOrderForUser) {
      const orderCreate = this.orderRepo.create({
        userId: decoded.sub,
      });
      order = await this.orderRepo.save(orderCreate);
    }

    const findOrderDetail = await this.orderDetailRepo.findOne({
      where: {
        productId: dto.productId,
        sizeId: dto.sizeId,
      },
    });

    let orderDetail: OrderDetail;

    if (findOrderDetail) {
      findOrderDetail.buy_count += dto.buy_count;
      findOrderDetail.price += dto.price;
      orderDetail = await this.orderDetailRepo.save(findOrderDetail);
    } else {
      const orderDetailCreate = this.orderDetailRepo.create({
        orderId: findOrderForUser ? findOrderForUser.id : order.id,
        statusId: StatusOrder.IN_CART,
        ...dto,
      });
      orderDetail = await this.orderDetailRepo.save(orderDetailCreate);
    }

    return orderDetail;
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

  async findByStatus(status: StatusOrder, request: Request) {
    const access_token =
      request.cookies['access_token'] &&
      request.cookies['access_token'].split(' ')[1];

    if (!access_token) {
      errorResponse(404, 'Vui lòng đăng nhập');
    }

    const decoded = this.jwtService.decode(access_token);

    const order = await this.orderRepo.findOne({
      where: {
        userId: decoded.sub,
        orderDetails: {
          statusId: status,
        },
      },
      relations: {
        orderDetails: {
          size: true,
          product: {
            color: true,
          },
        },
      },
    });

    return successResponse('Lấy order thành công', order);
  }

  async update(dto: UpdateOrderDto, id: string) {
    const { buy_count, statusId } = dto;

    let updateData: any = {};

    if (statusId) {
      updateData.statusId = statusId;
    }

    if (buy_count) {
      updateData.buy_count = () => `buy_count + ${buy_count}`;
    }

    const result = await this.orderDetailRepo.update({ id: id }, updateData);

    if (result.affected && result.affected > 0) {
      const order = await this.orderDetailRepo.findOne({ where: { id: id } });
      return successResponse('Update thành công', order);
    }
  }

  async createStatus(dto) {
    const orderStatus = await this.orderStatusRepo.save(dto);
    return successResponse('Thêm trạng thái đơn hàng thành công', orderStatus);
  }
}

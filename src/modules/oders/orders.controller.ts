import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order';
import { BuyProductDto } from './dto/buy-product';
import { StatusOrder } from './enums/status';
import { Request } from 'express';
import { UpdateOrderDto } from './dto/update-order';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/add-to-cart')
  addToCart(@Body() body: CreateOrderDto, @Req() request: Request) {
    const res = this.ordersService.addToCart(body, request);
    return res;
  }

  @Put(':id')
  updateOrder(@Body() body: UpdateOrderDto, @Param('id') id: string) {
    const res = this.ordersService.update(body, id);
    return res;
  }

  @Post('/status')
  createStatus(@Body() body) {
    const res = this.ordersService.createStatus(body);
    return res;
  }

  @Post('/buy-product')
  buyProduct(@Body() body: BuyProductDto[]) {
    const res = this.ordersService.buyProduct(body);
    return res;
  }

  @Get('/status/:id')
  getOrder(@Param('id') status: StatusOrder, @Req() request: Request) {
    const res = this.ordersService.findByStatus(status, request);
    return res;
  }
}

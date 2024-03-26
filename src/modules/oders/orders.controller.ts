import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order';
import { BuyProductDto } from './dto/buy-product';
import { StatusOrder } from './enums/status';
import { Request } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/add-to-cart')
  addToCart(@Body() body: CreateOrderDto) {
    const res = this.ordersService.addToCart(body);
    return res;
  }

  @Post('/status')
  createStatus(@Body() body) {
    const res = this.ordersService.createStatusOrder(body);
    return res;
  }

  @Post('/buy-product')
  buyProduct(@Body() body: BuyProductDto[]) {
    const res = this.ordersService.buyProduct(body);
    return res;
  }

  @Get('/status/:id')
  getOrder(@Param('id') status: StatusOrder, @Req() request: Request) {
    const res = this.ordersService.getOrder(status, request);
    return res;
  }
}

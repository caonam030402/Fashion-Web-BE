import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrder } from './dto/create-order';

@Controller('oders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/add-to-cart')
  addToCart(@Body() body: CreateOrder) {
    const res = this.ordersService.addToCart(body);
    return res;
  }
}

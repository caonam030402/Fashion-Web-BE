import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order';
import { BuyProductDto } from './dto/buy-product';

@Controller('oders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/add-to-cart')
  addToCart(@Body() body: CreateOrderDto) {
    const res = this.ordersService.addToCart(body);
    return res;
  }

  @Post('/buy-product')
  buyProduct(@Body() body: BuyProductDto[]) {
    const res = this.ordersService.buyProduct(body);
    return res;
  }
}

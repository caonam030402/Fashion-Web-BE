import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { successResponse } from 'src/common/utils/data-return';
import { FieldDiscount } from './enums/field-discounts';
import { CreateUserDiscountDto } from './dto/create-user-discount.dto';

@ApiTags('Discounts')
@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {}

  @Post('/create-discounts')
  @ApiBody({ type: [CreateDiscountDto] })
  async createDiscounts(@Body() discount: CreateDiscountDto[]) {
    const discounts = await this.discountsService.create(discount);
    return successResponse('Create success', discounts);
  }

  @Get('/get-discounts/:id')
  async getDiscount(@Param() id: number) {
    const discounts = await this.discountsService.findById(id, 'discount');
    return successResponse('Get success', discounts);
  }

  @Get('/get-user-discount/:id')
  async getUserDiscount(@Param() id: number) {
    const discounts = await this.discountsService.findById(id, 'userDiscount');
    return successResponse('Get success', discounts);
  }

  @Get('/get-discounts')
  async getDiscounts() {
    const discounts = await this.discountsService.find('discount');
    return successResponse('Get success', discounts);
  }

  @Get('/get-user-discounts')
  async getUserDiscounts() {
    const discounts = await this.discountsService.find('userDiscount');
    return successResponse('Get success', discounts);
  }

  @Post('/create-user-discounts')
  @ApiBody({ type: [CreateUserDiscountDto] })
  async createUserDiscounts(@Body() discount: CreateUserDiscountDto) {
    const discounts = await this.discountsService.createUserDiscounts(discount);
    return discounts;
  }
}

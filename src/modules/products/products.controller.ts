import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FieldRepo } from './enums/field-repo';
import { CreateCategoryChildDto } from './dto/create-category-children.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateColorDto } from './dto/create-color.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { createSizeDto } from './dto/create-size.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { CreateProductGroupDto } from './dto/create-product-group.dto';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('')
  @ApiQuery({ type: QueryProductDto, required: false })
  getProducts(@Query() dto: QueryProductDto) {
    const products = this.productService.getAll(FieldRepo.PRODUCT, dto);
    return products;
  }

  @Get('category')
  getCategories(dto) {
    const categories = this.productService.getAll(FieldRepo.CATEGORY);
    return categories;
  }

  @Get('group')
  getProductGroups(@Query() dto: QueryProductDto) {
    const groupByColor = this.productService.getAll(FieldRepo.PRODUCT_GROUP);
    return groupByColor;
  }

  @Post('')
  @ApiBody({ type: [CreateProductDto] })
  createProducts(@Body() dto: CreateProductDto) {
    const products = this.productService.create(dto, FieldRepo.PRODUCT);
    return products;
  }

  @Post('group')
  @ApiBody({ type: [CreateProductGroupDto] })
  createProductGroups(@Body() dto: CreateProductGroupDto) {
    const products = this.productService.create(dto, FieldRepo.PRODUCT_GROUP);
    return products;
  }

  @Post('category')
  @ApiBody({ type: [CreateCategoryDto] })
  createCategories(@Body() dto: CreateCategoryDto[]) {
    const categories = this.productService.create(dto, FieldRepo.CATEGORY);
    return categories;
  }

  @Post('category-children')
  @ApiBody({ type: [CreateCategoryChildDto] })
  createCategoryClothes(@Body() dto: CreateCategoryChildDto[]) {
    const categoryClothes = this.productService.create(
      dto,
      FieldRepo.CATEGORY_CHILDREN,
    );
    return categoryClothes;
  }

  @Post('colors')
  @ApiBody({ type: [CreateColorDto] })
  createColors(@Body() dto: CreateColorDto[]) {
    const colors = this.productService.create(dto, FieldRepo.COLOR);
    return colors;
  }

  @Post('sizes')
  @ApiBody({ type: [createSizeDto] })
  createSizes(@Body() dto: createSizeDto[]) {
    const sizes = this.productService.create(dto, FieldRepo.SIZE);
    return sizes;
  }
}

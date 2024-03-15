import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FieldRepo } from './enums/field-repo';
import { CreateCategoryChildDto } from './dto/create-category-children.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateColorDto } from './dto/create-color.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { createSizeDto } from './dto/create-size.dto';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('')
  getAllProducts() {
    const products = this.productService.getAll(FieldRepo.PRODUCT);
    return products;
  }

  @Get('category')
  getAllCategorys() {
    const categories = this.productService.getAll(FieldRepo.CATEGORY);
    return categories;
  }

  @Post('')
  createProducts(@Body() dto: CreateProductDto) {
    const products = this.productService.create(dto, FieldRepo.PRODUCT);
    return products;
  }

  @Post('category')
  createCategories(@Body() dto: CreateCategoryDto) {
    const categories = this.productService.create(dto, FieldRepo.CATEGORY);
    return categories;
  }

  @Post('category-children')
  createCategoryClothes(@Body() dto: CreateCategoryChildDto) {
    const categoryClothes = this.productService.create(
      dto,
      FieldRepo.CATEGORY_CHILDREN,
    );
    return categoryClothes;
  }

  @Post('colors')
  createColors(@Body() dto: CreateColorDto) {
    const colors = this.productService.create(dto, FieldRepo.COLOR);
    return colors;
  }

  @Post('sizes')
  createSizes(@Body() dto: createSizeDto) {
    const sizes = this.productService.create(dto, FieldRepo.SIZE);
    return sizes;
  }
}

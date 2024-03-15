import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FieldRepo } from './enums/field-repo';
import { CreateCategoryChildDto } from './dto/create-category-children.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('')
  getAllProduct() {
    const products = this.productService.getAll(FieldRepo.CATEGORY);
    return products;
  }

  @Get('category')
  getAllCategory() {
    const categories = this.productService.getAll(FieldRepo.CATEGORY);
    return categories;
  }

  @Post('')
  createProducts(@Body() dto) {
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
}

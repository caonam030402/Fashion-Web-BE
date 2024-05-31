import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FieldRepo } from './enums/field-repo';
import { CreateCategory } from './dto/create-category-children.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateColorDto } from './dto/create-color.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { createSizeDto } from './dto/create-size.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { CreateProductGroupDto } from './dto/create-product-group.dto';
import { successResponse } from 'src/common/utils/data-return';
import { CreateMaterialDto } from './dto/create-material.dto';
import { CreateCollection } from './dto/create-collection.dto';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('collection')
  async getCollections() {
    const categories = await this.productService.getAll(FieldRepo.COLLECTION);
    return successResponse('Lấy danh mục thành công', categories);
  }

  @Get('group')
  getProductGroups(@Query() dto: QueryProductDto) {
    const groupByColor = this.productService.getAll(FieldRepo.PRODUCT_GROUP);
    return groupByColor;
  }

  @Get('color-size-material')
  async getColorsSizesMaterials() {
    const groupByColor = await this.productService.getAll(FieldRepo.COLOR);
    return successResponse('Lấy thành công', groupByColor);
  }

  @Get(':collection')
  @ApiQuery({ type: QueryProductDto, required: false })
  async getProducts(
    @Query() dto: QueryProductDto,
    @Param('collection') collection: string,
  ) {
    const products = await this.productService.getAll(
      FieldRepo.PRODUCT,
      dto,
      collection,
    );
    return successResponse('Lấy sản phẩm thành công', products);
  }

  @Get('detail/:id')
  async getProductById(@Param('id') id: string) {
    const product = await this.productService.getById(id, FieldRepo.PRODUCT);

    return successResponse('Lấy thành công', product);
  }

  @Get('category/:collection')
  async getCategories(
    @Param('collection') collection: string,
    dto: QueryProductDto,
  ) {
    const categories = await this.productService.getAll(
      FieldRepo.CATEGORY,
      dto,
      collection,
    );
    return successResponse('Lấy thành công', categories);
  }

  @Post('')
  @ApiBody({ type: [CreateProductDto] })
  createProducts(@Body() dto: CreateProductDto[]) {
    const products = this.productService.create(dto, FieldRepo.PRODUCT);
    return products;
  }

  @Post('group')
  @ApiBody({ type: [CreateProductGroupDto] })
  createProductGroups(@Body() dto: CreateProductGroupDto[]) {
    const products = this.productService.create(dto, FieldRepo.PRODUCT_GROUP);
    return products;
  }

  @Post('material')
  @ApiBody({ type: [CreateMaterialDto] })
  createMaterials(@Body() dto: CreateMaterialDto[]) {
    const products = this.productService.create(dto, FieldRepo.MATERIAL);
    return products;
  }

  @Post('collection')
  @ApiBody({ type: [CreateCollection] })
  createCategories(@Body() dto: CreateCollection[]) {
    const categories = this.productService.create(dto, FieldRepo.COLLECTION);
    return categories;
  }

  @Post('collection/category')
  @ApiBody({ type: [CreateCategory] })
  createCategoryClothes(@Body() dto: CreateCategory[]) {
    const categoryClothes = this.productService.create(dto, FieldRepo.CATEGORY);
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

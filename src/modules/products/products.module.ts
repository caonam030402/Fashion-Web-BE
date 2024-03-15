import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';

import { Category } from 'src/entities/product-category.entity';
import { CategoryChildren } from 'src/entities/product-category-children';
import { Color } from 'src/entities/product-color.entity';
import { Size } from 'src/entities/product-size.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Category,
      CategoryChildren,
      Color,
      Size,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

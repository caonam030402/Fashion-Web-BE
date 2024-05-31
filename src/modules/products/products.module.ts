import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/modules/products/entities/product.entity';

import { Category } from 'src/modules/products/entities/product-category';
import { Color } from 'src/modules/products/entities/product-color.entity';
import { Size } from 'src/modules/products/entities/product-size.entity';
import { ProductGroup } from 'src/modules/products/entities/product-group.entity';
import { Material } from 'src/modules/products/entities/product-material';
import { Collection } from 'src/modules/products/entities/product-collection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Collection,
      Category,
      Color,
      Size,
      ProductGroup,
      Material,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

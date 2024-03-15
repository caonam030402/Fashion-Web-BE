import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';

import { Category } from 'src/entities/product-category.entity';
import { CategoryChildren } from 'src/entities/product-category-children';
import { Color } from 'src/entities/product-color.entity';
import { Size } from 'src/entities/product-size.entity';
import { groupBy } from 'rxjs';
import { ProductGroup } from 'src/entities/product-group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Category,
      CategoryChildren,
      Color,
      Size,
      ProductGroup,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/product-category.entity';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { FieldRepo } from './enums/field-repo';
import { CategoryChildren } from 'src/entities/product-category-children';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(CategoryChildren)
    private readonly categoryChildren: Repository<CategoryChildren>,
  ) {}
  async getAll(field: FieldRepo) {
    let datas;

    if (field === FieldRepo.CATEGORY) {
      datas = await this.categoryRepo.find({
        relations: {
          children: true,
        },
      });
    }

    return datas;
  }

  async create(dto, field: FieldRepo) {
    let datas;

    if (field === FieldRepo.CATEGORY) {
      datas = this.categoryRepo.create(dto);
      await this.categoryRepo.save(datas);
    }

    if (field === FieldRepo.CATEGORY_CHILDREN) {
      datas = this.categoryChildren.create(dto);
      await this.categoryChildren.save(datas);
    }

    if (field === FieldRepo.PRODUCT) {
      datas = this.productRepo.create(dto);
      await this.productRepo.save(datas);
    }

    return datas;
  }
}

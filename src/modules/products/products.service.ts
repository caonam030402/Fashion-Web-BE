import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/product-category.entity';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { FieldRepo } from './enums/field-repo';
import { CategoryChildren } from 'src/entities/product-category-children';
import { Color } from 'src/entities/product-color.entity';
import { Size } from 'src/entities/product-size.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ProductGroup } from 'src/entities/product-group.entity';
import { CreateCategoryChildDto } from './dto/create-category-children.dto';
import { CreateColorDto } from './dto/create-color.dto';
import { createSizeDto } from './dto/create-size.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(CategoryChildren)
    private readonly categoryChildrenRepo: Repository<CategoryChildren>,

    @InjectRepository(Size)
    private readonly sizeRepo: Repository<Size>,

    @InjectRepository(Color)
    private readonly colorRepo: Repository<Color>,

    @InjectRepository(ProductGroup)
    private readonly ProductGroupRepo: Repository<ProductGroup>,
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

    if (field === FieldRepo.PRODUCT) {
      datas = await this.productRepo.find({
        relations: {
          sizes: true,
          color: true,
          categories: true,
          categoryChild: true,
          colorVariations: true,
        },
      });
    }

    if (field === FieldRepo.PRODUCT_GROUP_BY_COLOR) {
      datas = await this.ProductGroupRepo.find({
        relations: {
          // products: true,
        },
      });
    }

    return datas;
  }

  async create(dto, field: FieldRepo) {
    let datas;

    if (field === FieldRepo.CATEGORY) {
      const categoryDto = dto as CreateCategoryDto;
      datas = this.categoryRepo.create(categoryDto);
      await this.categoryRepo.save(datas);
    }

    if (field === FieldRepo.CATEGORY_CHILDREN) {
      datas = this.categoryChildrenRepo.create(dto);
      await this.categoryChildrenRepo.save(datas);
    }

    if (field === FieldRepo.PRODUCT) {
      const productList = await Promise.all(
        dto.map(async (dto) => {
          return this.productRepo.create({
            ...dto,
            colorVariations: Array.isArray(dto.colorVariationIds)
              ? dto.colorVariationIds.map((colorId) => ({ id: colorId }))
              : [],
            sizes: Array.isArray(dto.sizeIds)
              ? dto.sizeIds.map((sizeId) => ({ id: sizeId }))
              : [],
          });
        }),
      );

      datas = await this.productRepo.save(productList);
    }

    if (field === FieldRepo.COLOR) {
      datas = this.colorRepo.create(dto);
      await this.colorRepo.save(datas);
    }

    if (field === FieldRepo.SIZE) {
      datas = this.sizeRepo.create(dto);
      await this.sizeRepo.save(datas);
    }

    if (field === FieldRepo.PRODUCT_GROUP_BY_COLOR) {
      datas = this.ProductGroupRepo.create(dto);
      await this.ProductGroupRepo.save(datas);
    }

    return datas;
  }
}
